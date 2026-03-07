'use client';

import Link from 'next/link';
import { memo, useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, Check, X, Grid3X3, LayoutGrid } from 'lucide-react';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-low' | 'price-high';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

interface CategorySectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  viewAllText?: string;
  bgColor?: 'white' | 'gray';
}

function CategorySectionComponent({
  title,
  products,
  viewAllHref,
  viewAllText = 'Discover more',
  bgColor = 'white',
}: CategorySectionProps) {
  const sectionId = `category-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

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

  return (
    <section
      className={`py-6 md:py-10 ${
        bgColor === 'gray' ? 'bg-[#f7f7f7]' : 'bg-white'
      }`}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="relative z-50 flex items-center justify-between mb-6 md:mb-8 animate-fade-in-up">
          <h2 
            id={`${sectionId}-title`}
            className="text-base md:text-lg font-normal text-[#111]"
          >
            {title}
          </h2>
          
          <div className="flex items-center gap-3">
            {/* Filter & Sort Dropdown */}
            <div className="relative z-50">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-normal text-[#111] border border-[#e0e0e0] rounded-full hover:border-[#111] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filter & Sort</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isFilterOpen && "rotate-180")} />
              </button>
              
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-[110] py-2">
                    <div className="px-4 py-2 border-b border-[#e5e5e5] flex items-center justify-between">
                      <span className="text-sm font-medium text-[#111]">Sort By</span>
                      <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors",
                          sortBy === option.value && "bg-gray-50"
                        )}
                      >
                        {option.label}
                        {sortBy === option.value && <Check className="w-4 h-4 text-[#111]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-[#f5f5f5] rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  viewMode === 'grid' ? "bg-[#111] text-white" : "text-[#666] hover:text-[#111]"
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  viewMode === 'carousel' ? "bg-[#111] text-white" : "text-[#666] hover:text-[#111]"
                )}
                aria-label="Carousel view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* View All Link */}
            <Link
              href={viewAllHref}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-normal text-[#111] border border-[#e0e0e0] rounded-full hover:border-[#111] transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              {viewAllText}
            </Link>
          </div>
        </div>

        {/* Products - Carousel or Grid View */}
        {viewMode === 'carousel' ? (
          <div className="relative touch-pan-y">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                dragFree: false,
                skipSnaps: false,
                containScroll: 'trimSnaps',
                watchDrag: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-5 cursor-grab active:cursor-grabbing">
                {sortedProducts.map((product, index) => (
                  <CarouselItem
                    key={product._id}
                    className="pl-4 md:pl-5 basis-[75%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%] xl:basis-[20%]"
                  >
                    <OptimizedProductCard 
                      product={product} 
                      priority={false}
                      index={index}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious 
                variant="light" 
                className="hidden sm:flex left-2 md:left-4 w-10 h-10 md:w-12 md:h-12" 
                aria-label={`Previous ${title} products`}
              />
              <CarouselNext 
                variant="light" 
                className="hidden sm:flex right-2 md:right-4 w-10 h-10 md:w-12 md:h-12" 
                aria-label={`Next ${title} products`}
              />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {sortedProducts.map((product, index) => (
              <OptimizedProductCard 
                key={product._id}
                product={product} 
                priority={false}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export const CategorySection = memo(CategorySectionComponent);
