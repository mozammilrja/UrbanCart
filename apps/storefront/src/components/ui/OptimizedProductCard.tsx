'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, memo, useCallback } from 'react';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface OptimizedProductCardProps {
  product: Product;
  className?: string;
  /** Load first image with priority for LCP */
  priority?: boolean;
  /** Index for staggered animation delay */
  index?: number;
}

/**
 * Performance-optimized ProductCard component.
 * Uses CSS hover states instead of heavy carousel for each card.
 * Memoized to prevent unnecessary re-renders.
 */
function ProductCardComponent({ 
  product, 
  className, 
  priority = false,
  index = 0
}: OptimizedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryImage = product.images[0];
  const hoverImage = product.images[1] || primaryImage;
  const hasHoverImage = product.images.length > 1;

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(prev => !prev);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <article
      className={cn(
        'group relative',
        'animate-fade-in-up',
        className
      )}
      style={{ 
        animationDelay: `${Math.min(index * 50, 300)}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Image Container - Simple hover image swap */}
      <div className="relative overflow-hidden bg-[#f5f5f5] aspect-square">
        <Link 
          href={`/product/${product.slug}`} 
          className="block relative w-full h-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
          aria-label={`View ${product.name} - RS. ${product.price.toLocaleString()}`}
        >
          {/* Primary Image */}
          <Image
            src={imageError ? '/placeholder-product.jpg' : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 25vw"
            className={cn(
              'object-cover transition-opacity duration-300',
              hasHoverImage ? 'group-hover:opacity-0' : ''
            )}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            onError={handleImageError}
          />
          
          {/* Hover Image - Only rendered if different from primary */}
          {hasHoverImage && !imageError && (
            <Image
              src={hoverImage}
              alt={`${product.name} - alternate view`}
              fill
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 25vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <span 
            className="absolute top-3 left-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 z-10"
            role="status"
            aria-label={`Product badge: ${product.badge}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button - Always accessible, visually hidden until hover on desktop */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            'absolute top-3 right-3 bg-[#333] hover:bg-[#444] p-2 transition-all z-10',
            'opacity-0 group-hover:opacity-100 focus:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-white'
          )}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors duration-200',
              isWishlisted ? 'fill-white stroke-white' : 'stroke-white fill-transparent'
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex items-start gap-3">
        <button
          className="p-1 hover:opacity-60 transition-opacity flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-black rounded"
          aria-label={`Quick add ${product.name} to cart`}
        >
          <Plus className="w-5 h-5 text-[#333]" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className="flex-1 min-w-0">
          <Link 
            href={`/product/${product.slug}`}
            className="focus:outline-none focus:underline"
          >
            <h3 className="text-sm font-normal text-[#111] hover:opacity-60 transition-opacity line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-sm text-[#666] mt-0.5 block" aria-label={`Price: ${product.price.toLocaleString()} Rupees`}>
            RS. {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}

// Memoize with custom comparison
export const OptimizedProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product._id === nextProps.product._id &&
    prevProps.priority === nextProps.priority &&
    prevProps.index === nextProps.index
  );
});

export default OptimizedProductCard;
