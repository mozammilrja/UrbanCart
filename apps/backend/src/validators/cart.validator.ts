import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantSku: z.string().min(1, 'Variant SKU is required'),
  quantity: z.number().int().min(1).max(10).default(1),
});

export const updateCartSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10),
});

export const applyCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').max(20),
});
