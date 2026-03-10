import { Router, Request, Response } from 'express';
import { Order, Cart, Product, Coupon, Address } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { config } from '../config/index.js';
import { sendSuccess, sendPaginated, buildPagination, parsePagination } from '../utils/response.js';

const router: ReturnType<typeof Router> = Router();

router.use(authenticate);

const generateOrderNumber = (): string => {
  const prefix = 'APO';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Get user orders
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.query;

  const query: any = { user: req.user._id };
  if (status) query.status = status;

  const { page, limit, skip } = parsePagination(req.query as any);

  const [orders, total] = await Promise.all([
    Order.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(query),
  ]);

  sendPaginated(res, { orders }, buildPagination(page, limit, total));
}));

// Get order detail
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).lean();

  if (!order) {
    throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  }

  sendSuccess(res, { order });
}));

// Create order
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { shippingAddressId, billingAddressId, paymentMethod = 'razorpay', notes } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400, 'CART_EMPTY');
  }

  // Validate addresses
  const shippingAddress = await Address.findOne({ _id: shippingAddressId, user: req.user._id });
  if (!shippingAddress) {
    throw new AppError('Shipping address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  const billingAddress = billingAddressId
    ? await Address.findOne({ _id: billingAddressId, user: req.user._id })
    : shippingAddress;

  if (!billingAddress) {
    throw new AppError('Billing address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  // Validate stock and build order items
  const orderItems = [];
  for (const item of cart.items) {
    const product = item.product as any;
    if (!product || !product.isActive) {
      throw new AppError('One or more products are no longer available', 400, 'PRODUCT_UNAVAILABLE');
    }

    const variant = product.variants.find((v: any) => v.sku === item.variant.sku);
    if (!variant || variant.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${product.name}`, 400, 'INSUFFICIENT_STOCK');
    }

    orderItems.push({
      product: product._id,
      variant: item.variant,
      name: product.name,
      image: product.thumbnail || product.images[0],
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    });
  }

  const tax = Math.round((cart.subtotal * config.business.gstRate) / 100);

  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    user: req.user._id,
    items: orderItems,
    shippingAddress: {
      fullName: shippingAddress.fullName,
      phone: shippingAddress.phone,
      addressLine1: shippingAddress.addressLine1,
      addressLine2: shippingAddress.addressLine2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      landmark: shippingAddress.landmark,
    },
    billingAddress: {
      fullName: billingAddress.fullName,
      phone: billingAddress.phone,
      addressLine1: billingAddress.addressLine1,
      addressLine2: billingAddress.addressLine2,
      city: billingAddress.city,
      state: billingAddress.state,
      pincode: billingAddress.pincode,
      landmark: billingAddress.landmark,
    },
    subtotal: cart.subtotal,
    shippingCharge: cart.shippingCharge,
    discount: cart.discount,
    tax,
    total: cart.total + tax,
    coupon: cart.coupon ? { code: cart.coupon.code, discount: cart.coupon.discount } : undefined,
    paymentMethod,
    notes,
  });

  // Update stock
  for (const item of cart.items) {
    await Product.updateOne(
      { _id: item.product, 'variants.sku': item.variant.sku },
      {
        $inc: {
          'variants.$.stock': -item.quantity,
          totalStock: -item.quantity,
          soldCount: item.quantity,
        },
      }
    );
  }

  // Update coupon usage
  if (cart.coupon) {
    await Coupon.findOneAndUpdate(
      { code: cart.coupon.code },
      {
        $inc: { usedCount: 1 },
        $push: {
          usedBy: { user: req.user._id, orderId: order._id, usedAt: new Date() },
        },
      }
    );
  }

  // Clear cart
  cart.items = [];
  cart.coupon = undefined;
  cart.subtotal = 0;
  cart.discount = 0;
  cart.shippingCharge = 0;
  cart.total = 0;
  await cart.save();

  sendSuccess(res, { order }, 201);
}));

// Cancel order
router.post('/:id/cancel', asyncHandler(async (req: Request, res: Response) => {
  const { reason } = req.body;

  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  }

  if (!['pending', 'confirmed'].includes(order.status)) {
    throw new AppError('Order cannot be cancelled at this stage', 400, 'CANNOT_CANCEL');
  }

  order.status = 'cancelled';
  order.cancelReason = reason;
  order.timeline.push({
    status: 'cancelled',
    message: reason || 'Order cancelled by customer',
    timestamp: new Date(),
  });

  // Restore stock
  for (const item of order.items) {
    await Product.updateOne(
      { _id: item.product, 'variants.sku': item.variant.sku },
      {
        $inc: {
          'variants.$.stock': item.quantity,
          totalStock: item.quantity,
          soldCount: -item.quantity,
        },
      }
    );
  }

  await order.save();

  sendSuccess(res, { order });
}));

// Request return
router.post('/:id/return', asyncHandler(async (req: Request, res: Response) => {
  const { reason } = req.body;

  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  }

  if (order.status !== 'delivered') {
    throw new AppError('Only delivered orders can be returned', 400, 'CANNOT_RETURN');
  }

  // Check return window (7 days)
  const deliveredDate = order.deliveredAt || order.updatedAt;
  const daysSinceDelivery = (Date.now() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceDelivery > 7) {
    throw new AppError('Return window has expired', 400, 'RETURN_WINDOW_EXPIRED');
  }

  order.status = 'returned';
  order.returnReason = reason;
  order.timeline.push({
    status: 'returned',
    message: reason || 'Return requested by customer',
    timestamp: new Date(),
  });

  await order.save();

  sendSuccess(res, { order });
}));

export default router;
