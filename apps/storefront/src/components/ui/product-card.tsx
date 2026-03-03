'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, gsapConfig } from '@/lib/gsap';
import { cn } from '@urbancart/ui';
import { TiltCard } from '../motion/magnetic-button';
import type { StorefrontProduct } from '@/types/storefront.types';

interface ProductCardProps {
  product: StorefrontProduct;
  className?: string;
  variant?: 'default' | 'minimal' | 'featured';
  showQuickAdd?: boolean;
  onQuickAdd?: (product: StorefrontProduct) => void;
  onWishlistToggle?: (product: StorefrontProduct) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  className = '',
  variant = 'default',
  showQuickAdd = true,
  onQuickAdd,
  onWishlistToggle,
  isWishlisted = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Get image URL (handles both string[] and ProductImage[])
  const getImageUrl = (index: number): string => {
    const img = product.images[index];
    if (typeof img === 'string') return img;
    return (img as { url: string })?.url || '/placeholder.jpg';
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImage(1);
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: gsapConfig.duration.fast,
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImage(0);
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: gsapConfig.duration.fast,
      });
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;
    
  const brand = product.brand || product.category?.name || 'UrbanCart';
  const isLimited = product.isLimited || product.tags?.includes('limited');
  
  if (variant === 'minimal') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className={cn('group block', className)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
          <Image
            src={getImageUrl(currentImage)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium text-white/90">{product.name}</h3>
          <p className="text-sm text-white/50">{formatPrice(product.price)}</p>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <TiltCard maxTilt={5}>
        <Link
          href={`/product/${product.slug}`}
          className={cn('group relative block', className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
            <Image
              src={getImageUrl(currentImage)}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs uppercase tracking-widest text-white/60">{brand}</p>
              <h3 className="mt-2 text-xl font-light text-white">{product.name}</h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-lg font-medium text-white">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-white/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-black">
                  New
                </span>
              )}
              {discount && (
                <span className="bg-red-500 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </Link>
      </TiltCard>
    );
  }
  
  // Default variant
  return (
    <div
      className={cn('group relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
          <Image
            src={getImageUrl(currentImage)}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Hover overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0"
          >
            {showQuickAdd && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickAdd?.(product);
                }}
                className="w-full border border-white bg-transparent py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
              >
                Quick Add
              </button>
            )}
          </div>
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-black">
                New
              </span>
            )}
            {isLimited && (
              <span className="bg-neutral-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                Limited
              </span>
            )}
            {discount && (
              <span className="bg-red-500 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                -{discount}%
              </span>
            )}
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onWishlistToggle?.(product);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg
              className={cn('h-4 w-4', isWishlisted ? 'fill-red-500 text-red-500' : 'text-white')}
              fill={isWishlisted ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-wider text-white/40">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-white/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        
        {/* Color swatches - extract unique colors from variants */}
        {product.variants && product.variants.length > 0 && (() => {
          const uniqueColors = Array.from(
            new Map(
              product.variants
                .filter((v): v is typeof v & { color: string; colorCode: string } => 
                  Boolean(v.color && v.colorCode)
                )
                .map(v => [v.color, { name: v.color, hex: v.colorCode }])
            ).values()
          );
          
          if (uniqueColors.length <= 1) return null;
          
          return (
            <div className="flex gap-1 pt-1">
              {uniqueColors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  className="h-3 w-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {uniqueColors.length > 4 && (
                <span className="text-xs text-white/40">+{uniqueColors.length - 4}</span>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: StorefrontProduct[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'minimal' | 'featured';
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  variant = 'default',
  className = '',
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };
  
  return (
    <div className={cn('grid gap-6 lg:gap-8', gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
