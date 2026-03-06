'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images.slice(0, 5);
  const hasMultipleImages = images.length > 1;

  return (
    <motion.div
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
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
                <Link href={`/product/${product.slug}`} className="block relative aspect-square">
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    priority={priority && index === 0}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows (show on hover) */}
          {hasMultipleImages && isHovered && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}

          {/* Pagination Dots (show on hover) */}
          {hasMultipleImages && isHovered && (
            <CarouselDots className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10" />
          )}
        </Carousel>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button (show on hover) */}
        {isHovered && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 bg-[#333] hover:bg-[#444] p-2 transition-colors z-10"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors duration-200',
                isWishlisted ? 'fill-white stroke-white' : 'stroke-white fill-transparent'
              )}
              strokeWidth={1.5}
            />
          </button>
        )}
      </div>

      {/* Product Info - + button on left */}
      <div className="mt-4 flex items-start gap-3">
        <button
          className="p-1 hover:opacity-60 transition-opacity flex-shrink-0"
          aria-label="Quick add to cart"
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
    </motion.div>
  );
}
