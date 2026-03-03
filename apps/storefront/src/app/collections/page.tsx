import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all APOSTLE collections - Premium Indian streetwear',
};

export default function CollectionsPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-center">
          Collections
        </h1>
        <p className="text-sm md:text-base text-[#777] tracking-wide text-center mt-4 max-w-lg mx-auto">
          Explore our curated collections of premium streetwear
        </p>
      </div>

      {/* Collections Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection._id} 
              href={`/collections/${collection.slug}`}
              className="group relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]"
            >
              <Image
                src={collection.bannerImage}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
                  {collection.name}
                </h2>
                <p className="text-sm text-white/80 mb-4">
                  {collection.productCount} Products
                </p>
                <span className="text-xs tracking-widest uppercase border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
