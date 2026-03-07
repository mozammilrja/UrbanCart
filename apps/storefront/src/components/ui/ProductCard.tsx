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
      {/* Left Arrow */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollPrev();
        }}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200",
          "opacity-0 group-hover:opacity-100",
          !canScrollPrev && "!opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-4 h-4 text-[#333]" />
      </button>
      
      {/* Right Arrow */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollNext();
        }}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200",
          "opacity-0 group-hover:opacity-100",
          !canScrollNext && "!opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="w-4 h-4 text-[#333]" />
      </button>
      
      {/* Dots */}
      {scrollSnaps.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollTo(index);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                index === selectedIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/80"
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
