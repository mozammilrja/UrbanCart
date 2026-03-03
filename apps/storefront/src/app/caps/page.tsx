import type { Metadata } from 'next';
import { ProductGridSection } from '@/components/sections';
import { getCapsProducts } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Caps',
  description: 'Premium caps and headwear collection - APOSTLE',
};

export default function CapsPage() {
  const capsProducts = getCapsProducts();

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
            Caps
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-md mx-auto">
            Premium headwear crafted for the streets. Dad caps, bucket hats, and more.
          </p>
        </div>
      </div>

      {/* Products */}
      <ProductGridSection
        products={capsProducts}
        columns={4}
      />
    </div>
  );
}
