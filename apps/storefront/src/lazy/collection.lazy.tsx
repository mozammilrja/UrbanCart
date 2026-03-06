/**
 * Lazy Loading - Collection Page
 */

import dynamic from 'next/dynamic';

// Lazy load collection header
export const CollectionHeader = dynamic(
  () => Promise.resolve({ default: () => null }),
  {
    loading: () => (
      <div className="h-64 animate-pulse bg-neutral-100" />
    ),
  }
);

// Lazy load collection products grid
export const CollectionProductGrid = dynamic(
  () => import('@/components/sections/ProductGridSection').then((mod) => mod.ProductGridSection),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-neutral-100 rounded-lg" />
        ))}
      </div>
    ),
  }
);
