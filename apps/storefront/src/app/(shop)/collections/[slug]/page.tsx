'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@urbancart/ui';
import { Heart, SlidersHorizontal, Grid, List } from 'lucide-react';

const collectionData: Record<string, { name: string; description: string; banner: string }> = {
  'streetwear-essentials': {
    name: 'Streetwear Essentials',
    description: 'Core pieces that define the urban aesthetic. Build your wardrobe with these must-have streetwear staples.',
    banner: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=400&fit=crop',
  },
  'limited-drops': {
    name: 'Limited Drops',
    description: 'Exclusive releases with limited quantities. Once they are gone, they are gone forever.',
    banner: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=1200&h=400&fit=crop',
  },
  'summer-2024': {
    name: 'Summer 2024',
    description: 'Lightweight and breathable styles perfect for the warm season ahead.',
    banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=400&fit=crop',
  },
};

const products = [
  { id: '1', name: 'Urban Oversized Tee', price: 1999, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', category: 'Tees', isNew: true },
  { id: '2', name: 'Street Drop Hoodie', price: 3499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop', category: 'Hoodies' },
  { id: '3', name: 'Classic Cargo Pants', price: 2999, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop', category: 'Pants' },
  { id: '4', name: 'Limited Edition Cap', price: 999, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop', category: 'Accessories', isNew: true },
  { id: '5', name: 'Premium Sneakers', price: 5999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', category: 'Footwear' },
  { id: '6', name: 'Graphic Tee', price: 1799, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop', category: 'Tees' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collectionData[slug] || {
    name: 'Collection',
    description: 'Explore our curated collection',
    banner: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=400&fit=crop',
  };

  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 overflow-hidden sm:h-80">
        <Image
          src={collection.banner}
          alt={collection.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-bold md:text-5xl">{collection.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{collection.description}</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-foreground">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{collection.name}</span>
        </nav>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{products.length} products</p>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="featured">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden items-center gap-1 sm:flex">
              <button className="rounded bg-primary p-1.5 text-primary-foreground">
                <Grid className="h-4 w-4" />
              </button>
              <button className="rounded p-1.5 text-muted-foreground hover:text-foreground">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Heart className="h-4 w-4" />
                </button>
                {product.isNew && (
                  <Badge className="absolute left-3 top-3">New</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive" className="absolute left-3 bottom-3">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <Link href={`/product/${product.id}`} className="font-medium hover:text-accent">
                  {product.name}
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
