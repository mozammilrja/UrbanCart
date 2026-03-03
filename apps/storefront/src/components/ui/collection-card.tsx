'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@urbancart/ui';
import { TiltCard } from '../motion/magnetic-button';
import { CursorSpotlight } from './luxury-effects';
import type { Collection } from '@urbancart/types';

const PLACEHOLDER_IMAGE = '/images/placeholder-collection.jpg';

interface CollectionCardProps {
  collection: Collection;
  className?: string;
  variant?: 'default' | 'large' | 'minimal';
}

export function CollectionCard({
  collection,
  className = '',
  variant = 'default',
}: CollectionCardProps) {
  const imageUrl = collection.image || PLACEHOLDER_IMAGE;

  if (variant === 'large') {
    return (
      <TiltCard maxTilt={3}>
        <Link
          href={`/collections/${collection.slug}`}
          className={cn('group relative block overflow-hidden', className)}
        >
          <div className="relative aspect-[21/9] overflow-hidden bg-neutral-900">
            <Image
              src={imageUrl}
              alt={collection.name}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Collection
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
                {collection.name}
              </h2>
              <p className="mt-4 max-w-md text-base text-white/70">
                {collection.description}
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white">
                  Explore Collection
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <Link
        href={`/collections/${collection.slug}`}
        className={cn('group block', className)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          <Image
            src={imageUrl}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <h3 className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-white/90">
          {collection.name}
        </h3>
      </Link>
    );
  }
  
  // Default variant
  return (
    <CursorSpotlight>
      <Link
        href={`/collections/${collection.slug}`}
        className={cn('group relative block overflow-hidden', className)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
          <Image
            src={imageUrl}
            alt={collection.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs uppercase tracking-widest text-white/50">
              {collection.productCount} Products
            </p>
            <h3 className="mt-2 text-2xl font-light text-white">{collection.name}</h3>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-white">
              <span>Explore</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </CursorSpotlight>
  );
}

interface CollectionGridProps {
  collections: Collection[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'minimal';
  className?: string;
}

export function CollectionGrid({
  collections,
  columns = 3,
  variant = 'default',
  className = '',
}: CollectionGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };
  
  return (
    <div className={cn('grid gap-6 lg:gap-8', gridCols[columns], className)}>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          variant={variant}
        />
      ))}
    </div>
  );
}

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  count?: number;
  className?: string;
}

export function CategoryCard({
  name,
  image,
  href,
  count,
  className = '',
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn('group relative block overflow-hidden', className)}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-900">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium uppercase tracking-wider text-white">
            {name}
          </h3>
          {count !== undefined && (
            <p className="mt-1 text-xs text-white/60">{count} Products</p>
          )}
        </div>
      </div>
    </Link>
  );
}
