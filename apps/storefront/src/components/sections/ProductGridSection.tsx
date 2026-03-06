'use client';

import Link from 'next/link';
import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import type { Product } from '@/types';

interface ProductGridSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  columns?: 3 | 4;
  viewAllHref?: string;
  viewAllText?: string;
  bgColor?: 'white' | 'gray';
}

function ProductGridSectionComponent({
  title,
  subtitle,
  products,
  columns = 4,
  viewAllHref,
  viewAllText = 'View All',
  bgColor = 'white',
}: ProductGridSectionProps) {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const sectionId = title ? `products-${title.toLowerCase().replace(/\s+/g, '-')}` : 'products-grid';

  return (
    <section
      className={`py-8 md:py-10 lg:py-12 ${
        bgColor === 'gray' ? 'bg-[#f7f7f7]' : 'bg-white'
      }`}
      aria-labelledby={title ? `${sectionId}-title` : undefined}
    >
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        {(title || viewAllHref) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14 animate-fade-in-up">
            <div>
              {title && (
                <h2 
                  id={`${sectionId}-title`}
                  className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#111]"
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs md:text-sm text-[#777] tracking-wide mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[#111] hover:text-[#777] transition-colors group focus:outline-none focus:underline"
              >
                {viewAllText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div
          className={`grid ${gridCols[columns]} gap-x-3 gap-y-8 md:gap-x-4 md:gap-y-12`}
          role="list"
          aria-label={title ? `${title} products` : 'Products'}
        >
          {products.map((product, index) => (
            <div key={product._id} role="listitem">
              <OptimizedProductCard 
                product={product} 
                priority={false}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const ProductGridSection = memo(ProductGridSectionComponent);
