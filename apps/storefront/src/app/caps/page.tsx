import type { Metadata } from 'next';
import { FilterableProductGrid } from '@/components/sections';
import { getCapsProducts } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Caps',
  description: 'Premium caps and headwear collection - APOSTLE',
};

export default function CapsPage() {
  const capsProducts = getCapsProducts();

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-neutral-100 to-white py-10 md:py-14">
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
            Caps
          </h1>
          <p className="mt-3 text-neutral-500 max-w-2xl">
            Premium headwear crafted for the streets. Dad caps, bucket hats, and more.
          </p>
        </div>
      </div>

      {/* Products with Filters */}
      <FilterableProductGrid
        products={capsProducts}
        showHeader={false}
      />
    </div>
  );
}
