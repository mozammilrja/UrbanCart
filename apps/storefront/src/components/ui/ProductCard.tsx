'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { cn, formatPriceCompact } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasSecondImage = product.images.length > 1;

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
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0] rounded-2xl">
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'object-cover transition-all duration-500 ease-out',
              isHovered && hasSecondImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            )}
            priority={priority}
          />
          
          {/* Secondary Image (hover) */}
          {hasSecondImage && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                'object-cover transition-all duration-500 ease-out',
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              )}
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button - Dark rounded square like BLUORNG */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 bg-[#333] hover:bg-[#444] p-2 rounded-lg transition-colors"
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
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-normal text-[#111] tracking-wide hover:text-[#777] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#111]">
            {formatPriceCompact(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-[#999] line-through">
              {formatPriceCompact(product.comparePrice)}
            </span>
          )}
        </div>

        {/* Color Options */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-3 h-3 rounded-full border border-[#e5e5e5]"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-[#999]">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
