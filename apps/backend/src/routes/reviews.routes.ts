import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Review, Product, Order } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import { sendSuccess, sendMessage, parsePagination } from '../utils/response.js';
import { validate } from '../middleware/validate.middleware.js';
import { createReviewSchema, updateReviewSchema } from '../validators/review.validator.js';

const router: ReturnType<typeof Router> = Router({ mergeParams: true });

// Get reviews for a product (nested: GET /api/v1/products/:productId/reviews)
router.get('/', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  if (!productId) {
    throw new AppError('Product ID required', 400, 'MISSING_PRODUCT_ID');
  }

  const { page = '1', limit = '10', sort = '-createdAt' } = req.query;

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)));
  const skip = (pageNum - 1) * limitNum;

  const [reviews, total, stats] = await Promise.all([
    Review.find({ product: productId, isApproved: true })
      .populate('user', 'firstName lastName avatar')
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Review.countDocuments({ product: productId, isApproved: true }),
    Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId), isApproved: true } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          rating5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
          rating4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          rating3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
          rating2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
          rating1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
        },
      },
    ]),
  ]);

  res.json({
    success: true,
    data: {
      reviews,
      stats: stats[0] || {
        avgRating: 0,
        totalReviews: 0,
        rating5: 0,
        rating4: 0,
        rating3: 0,
        rating2: 0,
        rating1: 0,
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

// Create review
router.post('/', authenticate, validate(createReviewSchema), asyncHandler(async (req: Request, res: Response) => {
  const { orderId, rating, title, comment, images } = req.body;
  const productId = req.params.productId || req.body.productId;

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  // Check if user already reviewed this product
  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingReview) {
    throw new AppError('You have already reviewed this product', 400, 'ALREADY_REVIEWED');
  }

  // Check if user purchased this product
  let isVerifiedPurchase = false;
  if (orderId) {
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
      status: 'delivered',
      'items.product': productId,
    });
    isVerifiedPurchase = !!order;
  } else {
    const order = await Order.findOne({
      user: req.user._id,
      status: 'delivered',
      'items.product': productId,
    });
    isVerifiedPurchase = !!order;
  }

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    order: orderId,
    rating,
    title,
    comment,
    images: images || [],
    isVerifiedPurchase,
  });

  const populatedReview = await Review.findById(review._id)
    .populate('user', 'firstName lastName avatar')
    .lean();

  sendSuccess(res, { review: populatedReview }, 201);
}));

// Update review
router.patch('/:id', authenticate, validate(updateReviewSchema), asyncHandler(async (req: Request, res: Response) => {
  const { rating, title, comment, images } = req.body;

  const review = await Review.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!review) {
    throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
  }

  if (rating !== undefined) review.rating = rating;
  if (title !== undefined) review.title = title;
  if (comment !== undefined) review.comment = comment;
  if (images !== undefined) review.images = images;

  await review.save();

  const populatedReview = await Review.findById(review._id)
    .populate('user', 'firstName lastName avatar')
    .lean();

  sendSuccess(res, { review: populatedReview });
}));

// Delete review
router.delete('/:id', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!review) {
    throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
  }

  sendMessage(res, 'Review deleted');
}));

// Mark review as helpful
router.post('/:id/helpful', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Review not found', 404, 'REVIEW_NOT_FOUND');
  }

  const alreadyVoted = review.helpfulVotes.some(
    (userId) => userId.toString() === req.user._id.toString()
  );

  if (alreadyVoted) {
    // Remove vote
    review.helpfulVotes = review.helpfulVotes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    review.helpfulCount = Math.max(0, review.helpfulCount - 1);
  } else {
    // Add vote
    review.helpfulVotes.push(req.user._id);
    review.helpfulCount += 1;
  }

  await review.save();

  sendSuccess(res, {
    helpfulCount: review.helpfulCount,
    voted: !alreadyVoted,
  });
}));

export default router;
