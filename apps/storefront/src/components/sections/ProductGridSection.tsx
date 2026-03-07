'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ArrowRight, SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, Check, X } from 'lucide-react';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGridSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  columns?: 3 | 4;
  viewAllHref?: string;
  viewAllText?: string;
  bgColor?: 'white' | 'gray';
  showFilters?: boolean;
}

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-low' | 'price-high';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function ProductGridSection({
  title,
  subtitle,
  products,
  columns = 4,
  viewAllHref,
  viewAllText = 'View All',
  bgColor = 'white',
  showFilters = true,
}: ProductGridSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const gridCols = viewMode === 'compact' 
    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
    : {
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      }[columns];

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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 animate-fade-in-up">
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

        {/* Filter & Sort Controls */}
        {showFilters && (
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              {/* Filter & Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] rounded-full hover:border-[#111] transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="font-medium text-sm">Filter & Sort</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    isFilterOpen && "rotate-180"
                  )} />
                </button>

                {/* Dropdown Menu - Responsive width */}
                {isFilterOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsFilterOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] max-w-[256px] sm:w-64 bg-white rounded-2xl shadow-xl border border-[#e5e5e5] z-50 overflow-hidden">
                      <div className="p-4 border-b border-[#e5e5e5]">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">Sort By</h3>
                          <button 
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 hover:bg-[#f5f5f5] rounded-full"
                            aria-label="Close filter menu"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsFilterOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                              sortBy === option.value
                                ? "bg-[#111] text-white"
                                : "hover:bg-[#f5f5f5]"
                            )}
                          >
                            <span>{option.label}</span>
                            {sortBy === option.value && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 border-t border-[#e5e5e5] bg-[#fafafa]">
                        <p className="text-xs text-[#777]">{sortedProducts.length} products</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-[#f5f5f5] rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === 'grid' 
                    ? "bg-[#111] text-white" 
                    : "text-[#666] hover:text-[#111]"
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === 'compact' 
                    ? "bg-[#111] text-white" 
                    : "text-[#666] hover:text-[#111]"
                )}
                aria-label="Compact view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div
          className={cn(
            "grid gap-x-3 gap-y-8 md:gap-x-4 md:gap-y-12",
            gridCols
          )}
          role="list"
          aria-label={title ? `${title} products` : 'Products'}
        >
          {sortedProducts.map((product, index) => (
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
