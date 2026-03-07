'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

// Custom navigation component for product card carousel
function ProductCardNav() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, selectedIndex, scrollSnaps, scrollTo } = useCarousel();
  
  return (
    <>
      {/* Left Arrow - 44px touch target for accessibility */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollPrev();
        }}
        disabled={!canScrollPrev}
        aria-label="Previous image"
        className={cn(
          "absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200",
          "opacity-0 group-hover:opacity-100 focus:opacity-100",
          !canScrollPrev && "!opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5 text-[#333]" />
      </button>
      
      {/* Right Arrow - 44px touch target for accessibility */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollNext();
        }}
        disabled={!canScrollNext}
        aria-label="Next image"
        className={cn(
          "absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200",
          "opacity-0 group-hover:opacity-100 focus:opacity-100",
          !canScrollNext && "!opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="w-5 h-5 text-[#333]" />
      </button>
      
      {/* Dots - Larger touch targets */}
      {scrollSnaps.length > 1 && (
        <div 
          className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200"
          role="tablist"
          aria-label="Image gallery navigation"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollTo(index);
              }}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to image ${index + 1}`}
              className={cn(
                "h-2 sm:h-2.5 rounded-full transition-all duration-200 min-w-[8px]",
                index === selectedIndex
                  ? "w-5 sm:w-6 bg-white"
                  : "w-2 sm:w-2.5 bg-white/60 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = product.images.length > 0 ? product.images.slice(0, 5) : ['/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  return (
    <div className={cn('group relative', className)}>
      {/* Image Container with Embla Carousel */}
      <div className="relative overflow-hidden bg-[#f5f5f5]">
        <Carousel
          opts={{
            loop: true,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-0">
                <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4]">
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={priority && index === 0}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation (arrows + dots) */}
          {hasMultipleImages && <ProductCardNav />}
        </Carousel>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-all z-20 opacity-0 group-hover:opacity-100"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors duration-200',
              isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-[#333] fill-transparent'
            )}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex items-start gap-3">
        <button
          className="p-1 hover:opacity-60 transition-opacity flex-shrink-0"
          aria-label="Quick add to cart"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus className="w-5 h-5 text-[#333]" strokeWidth={1.5} />
        </button>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-normal text-[#111] hover:opacity-60 transition-opacity line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-sm text-[#666] mt-0.5 block">
            RS. {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
