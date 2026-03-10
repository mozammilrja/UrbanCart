import { Router, Request, Response } from 'express';
import { User, Product, Category, Collection, Order, Coupon, Review } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.use(authenticate, isAdmin);

// Dashboard Stats
router.get('/dashboard', asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalUsers,
    totalProducts,
    totalOrders,
    revenueStats,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    User.countDocuments({ role: 'customer' }),
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          avgOrderValue: { $avg: '$total' },
        },
      },
    ]),
    Order.find().sort('-createdAt').limit(10).populate('user', 'firstName lastName email').lean(),
    Product.find({ isActive: true }).sort('-soldCount').limit(5).select('name thumbnail soldCount basePrice').lean(),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenueStats[0]?.totalRevenue || 0,
        avgOrderValue: revenueStats[0]?.avgOrderValue || 0,
      },
      recentOrders,
      topProducts,
    },
  });
}));

// Users Management
router.get('/users', asyncHandler(async (req: Request, res: Response) => {
  const { page = '1', limit = '20', search, role } = req.query;

  const query: any = {};
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (role) query.role = role;

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));

  const [users, total] = await Promise.all([
    User.find(query).sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum).select('-password -refreshToken').lean(),
    User.countDocuments(query),
  ]);

  res.json({ success: true, data: { users, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } } });
}));

router.patch('/users/:id/block', asyncHandler(async (req: Request, res: Response) => {
  const { isBlocked } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { isBlocked }, { new: true }).select('-password -refreshToken');
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  res.json({ success: true, data: { user } });
}));

// Products Management
router.get('/products', asyncHandler(async (req: Request, res: Response) => {
  const { page = '1', limit = '20', search, category, isActive } = req.query;

  const query: any = {};
  if (search) query.$text = { $search: search as string };
  if (category) query.category = category;
  if (isActive !== undefined) query.isActive = isActive === 'true';

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));

  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name').sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum).lean(),
    Product.countDocuments(query),
  ]);

  res.json({ success: true, data: { products, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } } });
}));

router.post('/products', asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: { product } });
}));

router.patch('/products/:id', asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  res.json({ success: true, data: { product } });
}));

router.delete('/products/:id', asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  res.json({ success: true, message: 'Product deleted' });
}));

// Categories Management
router.get('/categories', asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find().sort('order name').lean();
  res.json({ success: true, data: { categories } });
}));

router.post('/categories', asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: { category } });
}));

router.patch('/categories/:id', asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  res.json({ success: true, data: { category } });
}));

router.delete('/categories/:id', asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  res.json({ success: true, message: 'Category deleted' });
}));

// Collections Management
router.get('/collections', asyncHandler(async (_req: Request, res: Response) => {
  const collections = await Collection.find().sort('order -createdAt').lean();
  res.json({ success: true, data: { collections } });
}));

router.post('/collections', asyncHandler(async (req: Request, res: Response) => {
  const collection = await Collection.create(req.body);
  res.status(201).json({ success: true, data: { collection } });
}));

router.patch('/collections/:id', asyncHandler(async (req: Request, res: Response) => {
  const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!collection) throw new AppError('Collection not found', 404, 'COLLECTION_NOT_FOUND');
  res.json({ success: true, data: { collection } });
}));

router.delete('/collections/:id', asyncHandler(async (req: Request, res: Response) => {
  const collection = await Collection.findByIdAndDelete(req.params.id);
  if (!collection) throw new AppError('Collection not found', 404, 'COLLECTION_NOT_FOUND');
  res.json({ success: true, message: 'Collection deleted' });
}));

// Orders Management
router.get('/orders', asyncHandler(async (req: Request, res: Response) => {
  const { page = '1', limit = '20', status, paymentStatus } = req.query;

  const query: any = {};
  if (status) query.status = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));

  const [orders, total] = await Promise.all([
    Order.find(query).populate('user', 'firstName lastName email').sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum).lean(),
    Order.countDocuments(query),
  ]);

  res.json({ success: true, data: { orders, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } } });
}));

router.get('/orders/:id', asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email phone').lean();
  if (!order) throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  res.json({ success: true, data: { order } });
}));

router.patch('/orders/:id/status', asyncHandler(async (req: Request, res: Response) => {
  const { status, trackingNumber, carrier, message } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');

  order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (carrier) order.carrier = carrier;
  if (status === 'delivered') order.deliveredAt = new Date();

  order.timeline.push({
    status,
    message: message || `Order status updated to ${status}`,
    timestamp: new Date(),
  });

  await order.save();
  res.json({ success: true, data: { order } });
}));

// Coupons Management
router.get('/coupons', asyncHandler(async (_req: Request, res: Response) => {
  const coupons = await Coupon.find().sort('-createdAt').lean();
  res.json({ success: true, data: { coupons } });
}));

router.post('/coupons', asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, data: { coupon } });
}));

router.patch('/coupons/:id', asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!coupon) throw new AppError('Coupon not found', 404, 'COUPON_NOT_FOUND');
  res.json({ success: true, data: { coupon } });
}));

router.delete('/coupons/:id', asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) throw new AppError('Coupon not found', 404, 'COUPON_NOT_FOUND');
  res.json({ success: true, message: 'Coupon deleted' });
}));

// Reviews Management
router.get('/reviews', asyncHandler(async (req: Request, res: Response) => {
  const { page = '1', limit = '20', isApproved } = req.query;

  const query: any = {};
  if (isApproved !== undefined) query.isApproved = isApproved === 'true';

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));

  const [reviews, total] = await Promise.all([
    Review.find(query).populate('user', 'firstName lastName').populate('product', 'name').sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum).lean(),
    Review.countDocuments(query),
  ]);

  res.json({ success: true, data: { reviews, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } } });
}));

router.patch('/reviews/:id/approve', asyncHandler(async (req: Request, res: Response) => {
  const { isApproved } = req.body;
  const review = await Review.findByIdAndUpdate(req.params.id, { isApproved }, { new: true });
  if (!review) throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
  res.json({ success: true, data: { review } });
}));

router.delete('/reviews/:id', asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
  res.json({ success: true, message: 'Review deleted' });
}));

export default router;
