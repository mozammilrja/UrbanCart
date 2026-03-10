import { z } from 'zod';

export const createReviewSchema = z.object({
  productId: z.string().optional(),
  orderId: z.string().optional(),
  rating: z.number().int().min(1, 'Rating must be 1-5').max(5, 'Rating must be 1-5'),
  title: z.string().min(1, 'Title is required').max(200),
  comment: z.string().min(1, 'Comment is required').max(2000),
  images: z.array(z.string().url()).max(5).optional(),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().min(1).max(200).optional(),
  comment: z.string().min(1).max(2000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
});
