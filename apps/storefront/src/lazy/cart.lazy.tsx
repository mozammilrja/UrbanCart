/**
 * Lazy Loading - Cart Page
 */

import dynamic from 'next/dynamic';

// Lazy load cart summary
export const CartSummary = dynamic(
  () => Promise.resolve({ default: () => null }),
  {
    loading: () => (
      <div className="p-6 animate-pulse bg-neutral-50 rounded-lg">
        <div className="h-6 w-32 bg-neutral-200 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-200 rounded" />
          <div className="h-4 w-3/4 bg-neutral-200 rounded" />
          <div className="h-4 w-1/2 bg-neutral-200 rounded" />
        </div>
      </div>
    ),
  }
);

// Lazy load coupon input
export const CouponInput = dynamic(
  () => import('@/components/form').then((mod) => mod.Input),
  {
    loading: () => (
      <div className="h-10 w-full animate-pulse bg-neutral-100 rounded" />
    ),
  }
);

// Lazy load recommended products
export const RecommendedProducts = dynamic(
  () => import('@/components/sections/ProductGridSection').then((mod) => mod.ProductGridSection),
  {
    loading: () => (
      <div className="grid grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-neutral-100 rounded-lg" />
        ))}
      </div>
    ),
  }
);
