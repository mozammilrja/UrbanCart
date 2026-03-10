import { Router, Request, Response } from 'express';
import { Cart, Product, Coupon } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { config } from '../config/index.js';
import { sendSuccess, sendMessage } from '../utils/response.js';
import { validate } from '../middleware/validate.middleware.js';
import { addToCartSchema, updateCartSchema, applyCouponSchema } from '../validators/cart.validator.js';

const router: ReturnType<typeof Router> = Router();

router.use(authenticate);

// Get cart
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  if (!cart) {
    cart = {
      items: [],
      subtotal: 0,
      discount: 0,
      shippingCharge: 0,
      total: 0,
    } as any;
  }

  sendSuccess(res, { cart });
}));

// Add item to cart
router.post('/add', validate(addToCartSchema), asyncHandler(async (req: Request, res: Response) => {
  const { productId, variantSku, quantity = 1 } = req.body;

  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  const variant = product.variants.find((v) => v.sku === variantSku);
  if (!variant) {
    throw new AppError('Variant not found', 404, 'VARIANT_NOT_FOUND');
  }

  if (variant.stock < quantity) {
    throw new AppError('Insufficient stock', 400, 'INSUFFICIENT_STOCK');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId && item.variant.sku === variantSku
  );

  if (existingItemIndex > -1) {
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    if (newQuantity > variant.stock) {
      throw new AppError('Quantity exceeds available stock', 400, 'EXCEEDS_STOCK');
    }
    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    cart.items.push({
      product: product._id,
      variant: {
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
      },
      quantity,
      price: variant.price,
      addedAt: new Date(),
    });
  }

  (cart as any).calculateTotals(
    config.business.freeShippingThreshold,
    config.business.shippingCharge
  );
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  sendSuccess(res, { cart: populatedCart });
}));

// Update cart item quantity
router.patch('/update', validate(updateCartSchema), asyncHandler(async (req: Request, res: Response) => {
  const { itemId, quantity } = req.body;

  if (quantity < 1) {
    throw new AppError('Quantity must be at least 1', 400, 'INVALID_QUANTITY');
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new AppError('Cart not found', 404, 'CART_NOT_FOUND');
  }

  const itemIndex = cart.items.findIndex((item) => (item as any)._id.toString() === itemId);
  if (itemIndex === -1) {
    throw new AppError('Item not found in cart', 404, 'ITEM_NOT_FOUND');
  }

  const item = cart.items[itemIndex];
  const product = await Product.findById(item.product);
  
  if (product) {
    const variant = product.variants.find((v) => v.sku === item.variant.sku);
    if (variant && quantity > variant.stock) {
      throw new AppError('Quantity exceeds available stock', 400, 'EXCEEDS_STOCK');
    }
  }

  cart.items[itemIndex].quantity = quantity;
  (cart as any).calculateTotals(
    config.business.freeShippingThreshold,
    config.business.shippingCharge
  );
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  sendSuccess(res, { cart: populatedCart });
}));

// Remove item from cart
router.delete('/remove/:itemId', asyncHandler(async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new AppError('Cart not found', 404, 'CART_NOT_FOUND');
  }

  cart.items = cart.items.filter((item) => (item as any)._id.toString() !== req.params.itemId);
  
  (cart as any).calculateTotals(
    config.business.freeShippingThreshold,
    config.business.shippingCharge
  );
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  sendSuccess(res, { cart: populatedCart });
}));

// Clear cart
router.delete('/clear', asyncHandler(async (req: Request, res: Response) => {
  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [], coupon: undefined, subtotal: 0, discount: 0, shippingCharge: 0, total: 0 }
  );

  sendMessage(res, 'Cart cleared');
}));

// Apply coupon
router.post('/apply-coupon', validate(applyCouponSchema), asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400, 'CART_EMPTY');
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    throw new AppError('Invalid coupon code', 400, 'INVALID_COUPON');
  }

  if (!(coupon as any).isValid()) {
    throw new AppError('Coupon is not valid or has expired', 400, 'COUPON_EXPIRED');
  }

  if (cart.subtotal < coupon.minOrderAmount) {
    throw new AppError(
      `Minimum order amount is ₹${coupon.minOrderAmount}`,
      400,
      'MIN_ORDER_NOT_MET'
    );
  }

  const userUsage = coupon.usedBy.filter(
    (u) => u.user.toString() === req.user._id.toString()
  ).length;

  if (userUsage >= coupon.perUserLimit) {
    throw new AppError('Coupon usage limit reached', 400, 'COUPON_LIMIT_REACHED');
  }

  const discount = (coupon as any).calculateDiscount(cart.subtotal);

  cart.coupon = {
    code: coupon.code,
    discount,
    discountType: coupon.discountType,
  };

  (cart as any).calculateTotals(
    config.business.freeShippingThreshold,
    config.business.shippingCharge
  );
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  sendSuccess(res, { cart: populatedCart });
}));

// Remove coupon
router.delete('/remove-coupon', asyncHandler(async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new AppError('Cart not found', 404, 'CART_NOT_FOUND');
  }

  cart.coupon = undefined;
  (cart as any).calculateTotals(
    config.business.freeShippingThreshold,
    config.business.shippingCharge
  );
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name slug thumbnail basePrice variants')
    .lean();

  sendSuccess(res, { cart: populatedCart });
}));

export default router;
