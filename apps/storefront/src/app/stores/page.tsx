import type { Metadata } from 'next';
import { StoreLocationsSection } from '@/components/sections';
import { storeLocations } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Our Stores',
  description: 'Visit APOSTLE stores across India',
};

export default function StoresPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
            Our Stores
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-md mx-auto">
            Experience APOSTLE in person. Visit us at one of our locations.
          </p>
        </div>
      </div>

      {/* Store Locations */}
      <StoreLocationsSection
        title=""
        subtitle=""
        stores={storeLocations}
      />
    </div>
  );
}
