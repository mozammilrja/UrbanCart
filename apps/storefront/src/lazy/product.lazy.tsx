/**
 * Lazy Loading - Product Page
 */

import dynamic from 'next/dynamic';

// Lazy load product gallery
export const ProductGallery = dynamic(
  () => import('@/features/product/components').then((mod) => mod.ProductCard),
  {
    loading: () => (
      <div className="aspect-[3/4] animate-pulse bg-neutral-100" />
    ),
  }
);

// Lazy load related products
export const RelatedProducts = dynamic(
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

// Lazy load size guide modal
export const SizeGuideModal = dynamic(
  () => import('@/components/feedback').then((mod) => ({ default: () => null })),
  {
    loading: () => null,
    ssr: false,
  }
);

// Lazy load reviews section
export const ReviewsSection = dynamic(
  () => Promise.resolve({ default: () => null }),
  {
    loading: () => (
      <div className="h-64 animate-pulse bg-neutral-100 rounded-lg" />
    ),
  }
);
