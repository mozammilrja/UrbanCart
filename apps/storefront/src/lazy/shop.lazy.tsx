/**
 * Lazy Loading - Shop Page
 */

import dynamic from 'next/dynamic';

// Lazy load product grid
export const ProductGrid = dynamic(
  () => import('@/components/sections/ProductGridSection').then((mod) => mod.ProductGridSection),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-neutral-100 rounded-lg" />
        ))}
      </div>
    ),
  }
);

// Lazy load filters sidebar
export const FiltersSidebar = dynamic(
  () => Promise.resolve({ default: () => null }),
  {
    loading: () => (
      <div className="w-64 h-screen animate-pulse bg-neutral-50" />
    ),
    ssr: false,
  }
);

// Lazy load sort dropdown
export const SortDropdown = dynamic(
  () => import('@/components/form').then((mod) => mod.Select),
  {
    loading: () => (
      <div className="w-40 h-10 animate-pulse bg-neutral-100 rounded" />
    ),
  }
);
