import { Router, Request, Response } from 'express';
import { User, Order, Wishlist } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { sendSuccess, sendMessage } from '../utils/response.js';
import { validate } from '../middleware/validate.middleware.js';
import { changePasswordSchema } from '../validators/auth.validator.js';

const router: ReturnType<typeof Router> = Router();

router.use(authenticate);

// Get user profile
router.get('/profile', asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select('-password -refreshToken');

  sendSuccess(res, { user });
}));

// Update user profile
router.patch('/profile', asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, phone, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { firstName, lastName, phone, avatar },
    { new: true, runValidators: true }
  ).select('-password -refreshToken');

  sendSuccess(res, { user });
}));

// Change password
router.post('/change-password', validate(changePasswordSchema), asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }

  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400, 'INCORRECT_PASSWORD');
  }

  user.password = newPassword;
  user.refreshToken = undefined;
  await user.save();

  sendMessage(res, 'Password changed successfully');
}));

// Get user dashboard data
router.get('/dashboard', asyncHandler(async (req: Request, res: Response) => {
  const [orderStats, recentOrders, wishlistCount] = await Promise.all([
    Order.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          pendingOrders: {
            $sum: { $cond: [{ $in: ['$status', ['pending', 'confirmed', 'processing']] }, 1, 0] },
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] },
          },
        },
      },
    ]),
    Order.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(5)
      .lean(),
    Wishlist.findOne({ user: req.user._id }).then((w) => w?.items.length || 0),
  ]);

  const stats = orderStats[0] || {
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  };

  sendSuccess(res, {
    stats: {
      ...stats,
      wishlistCount,
    },
    recentOrders,
  });
}));

export default router;
