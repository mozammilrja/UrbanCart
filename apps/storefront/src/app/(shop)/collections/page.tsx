'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button as Btn } from '@urbancart/ui';

const collections = [
  {
    id: 'streetwear-essentials',
    name: 'Streetwear Essentials',
    description: 'Core pieces that define the urban aesthetic',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop',
    productCount: 24,
  },
  {
    id: 'limited-drops',
    name: 'Limited Drops',
    description: 'Exclusive releases, limited quantities',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=600&h=400&fit=crop',
    productCount: 8,
  },
  {
    id: 'summer-2024',
    name: 'Summer 2024',
    description: 'Lightweight styles for the season',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    productCount: 18,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Classic black and white statement pieces',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
    productCount: 12,
  },
  {
    id: 'urban-accessories',
    name: 'Urban Accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop',
    productCount: 15,
  },
  {
    id: 'collaboration',
    name: 'Artist Collaborations',
    description: 'Unique designs from creative partnerships',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=400&fit=crop',
    productCount: 6,
  },
];

export default function CollectionsPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Collections</span>
      </nav>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Our Collections</h1>
        <p className="mt-2 text-muted-foreground">
          Curated selections of our finest streetwear
        </p>
      </div>

      {/* Featured collection */}
      <Link href={`/collections/${collections[0].id}`} className="group mb-12 block">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={collections[0].image}
            alt={collections[0].name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <span className="text-sm uppercase tracking-wider">Featured Collection</span>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">{collections[0].name}</h2>
            <p className="mt-3 max-w-md text-white/80">{collections[0].description}</p>
            <Btn className="mt-6" variant="outline">
              Explore Collection
            </Btn>
          </div>
        </div>
      </Link>

      {/* Collections grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.slice(1).map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{collection.name}</h3>
                <p className="mt-1 text-sm text-white/80">{collection.productCount} Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
