import { Router, Request, Response } from 'express';
import { Wishlist, Product, Cart } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { config } from '../config/index.js';
import { sendSuccess, sendMessage } from '../utils/response.js';

const router = Router();

router.use(authenticate);

// Get wishlist
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id })
    .populate('items.product', 'name slug thumbnail basePrice comparePrice variants isActive')
    .lean();

  if (!wishlist) {
    wishlist = { items: [] } as any;
  }

  // Filter out inactive products
  const items = wishlist?.items?.filter((item: any) => item.product?.isActive) ?? [];

  sendSuccess(res, { wishlist: { items } });
}));

// Add item to wishlist
router.post('/add', asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body;

  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user._id, items: [] });
  }

  const exists = wishlist.items.some(
    (item) => item.product.toString() === productId
  );

  if (exists) {
    throw new AppError('Product already in wishlist', 400, 'ALREADY_IN_WISHLIST');
  }

  wishlist.items.push({
    product: product._id,
    addedAt: new Date(),
  });

  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id)
    .populate('items.product', 'name slug thumbnail basePrice comparePrice variants isActive')
    .lean();

  sendSuccess(res, { wishlist: populatedWishlist }, 201);
}));

// Remove item from wishlist
router.delete('/remove/:productId', asyncHandler(async (req: Request, res: Response) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    throw new AppError('Wishlist not found', 404, 'WISHLIST_NOT_FOUND');
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id)
    .populate('items.product', 'name slug thumbnail basePrice comparePrice variants isActive')
    .lean();

  sendSuccess(res, { wishlist: populatedWishlist });
}));

// Move item to cart
router.post('/items/:productId/move-to-cart', asyncHandler(async (req: Request, res: Response) => {
  const { variantSku, quantity = 1 } = req.body;

  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    throw new AppError('Wishlist not found', 404, 'WISHLIST_NOT_FOUND');
  }

  const wishlistItem = wishlist.items.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!wishlistItem) {
    throw new AppError('Product not in wishlist', 404, 'NOT_IN_WISHLIST');
  }

  const product = await Product.findById(req.params.productId);
  if (!product || !product.isActive) {
    throw new AppError('Product not available', 404, 'PRODUCT_NOT_FOUND');
  }

  const variant = product.variants.find((v) => v.sku === variantSku);
  if (!variant) {
    throw new AppError('Please select a variant', 400, 'VARIANT_REQUIRED');
  }

  if (variant.stock < quantity) {
    throw new AppError('Insufficient stock', 400, 'INSUFFICIENT_STOCK');
  }

  // Add to cart
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingCartItem = cart.items.find(
    (item) => item.product.toString() === req.params.productId && item.variant.sku === variantSku
  );

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
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

  // Remove from wishlist
  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await wishlist.save();

  sendMessage(res, 'Item moved to cart');
}));

// Clear wishlist
router.delete('/clear', asyncHandler(async (req: Request, res: Response) => {
  await Wishlist.findOneAndUpdate(
    { user: req.user._id },
    { items: [] }
  );

  sendMessage(res, 'Wishlist cleared');
}));

export default router;
