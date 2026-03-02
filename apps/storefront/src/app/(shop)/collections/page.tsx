'use client';

import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    id: 'menswear',
    name: 'Menswear',
    description: 'All Clothing Menswear',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop',
    productCount: 134,
  },
  {
    id: 'streetwear-essentials',
    name: 'Streetwear Essentials',
    description: 'Core pieces that define the urban aesthetic',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=1000&fit=crop',
    productCount: 24,
  },
  {
    id: 'limited-drops',
    name: 'Limited Drops',
    description: 'Exclusive releases, limited quantities',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=800&h=1000&fit=crop',
    productCount: 8,
  },
  {
    id: 'summer-2024',
    name: 'Summer 2024',
    description: 'Lightweight styles for the season',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
    productCount: 18,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Classic black and white statement pieces',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    productCount: 12,
  },
  {
    id: 'urban-accessories',
    name: 'Urban Accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&h=1000&fit=crop',
    productCount: 15,
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Page Header */}
      <div className="border-b border-neutral-800">
        <div className="container py-8 sm:py-12">
          <h1 className="text-center text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl">
            Our <span className="font-medium">Collections</span>
          </h1>
          <p className="mt-4 text-center text-sm text-neutral-400 sm:text-base">
            Curated selections of our finest streetwear
          </p>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="border-b border-neutral-800">
        <Link href={`/collections/${collections[0].id}`} className="group block">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={collections[0].image}
              alt={collections[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-300">
                Featured Collection
              </span>
              <h2 className="mt-4 text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {collections[0].name}
              </h2>
              <p className="mt-4 max-w-md text-neutral-300">
                {collections[0].description}
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center border border-white/30 px-6 py-2 text-sm font-medium uppercase tracking-wider text-white transition-colors group-hover:bg-white group-hover:text-neutral-900">
                  View Collection
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Collections Grid */}
      <div className="container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {collections.slice(1).map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-medium text-white">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400">
                    {collection.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
