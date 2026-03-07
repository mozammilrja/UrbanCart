'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/ui/ProductCard';
import { 
  ArrowRight, 
  Grid3X3, 
  LayoutGrid,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-low' | 'price-high';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

interface CollectionProductsSectionProps {
  products: Product[];
  collectionName: string;
  recommendedProducts: Product[];
}

export function CollectionProductsSection({ 
  products: displayProducts, 
  collectionName,
  recommendedProducts 
}: CollectionProductsSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const sorted = [...displayProducts];
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
  }, [displayProducts, sortBy]);

  return (
    <>
      {/* Products Section - Edge to Edge */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #111 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative w-full">
          {/* Section Header - Edge to Edge */}
          <div className="px-3 sm:px-6 lg:px-10 mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-[#111]" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#555] font-medium">
                    The Collection
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-3">
                  {collectionName}
                </h2>
                <p className="text-base md:text-lg text-[#666] max-w-md">
                  {displayProducts.length} exclusive pieces crafted for the bold
                </p>
              </div>
              
              {/* View Toggle & Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Filter & Sort Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-6 py-3 text-sm text-[#555] hover:text-[#111] bg-white border border-[#e0e0e0] rounded-full hover:border-[#111] hover:shadow-lg transition-all duration-300"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="font-medium">Filter & Sort</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isFilterOpen && "rotate-180"
                    )} />
                  </button>

                  {/* Dropdown Menu */}
                  {isFilterOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsFilterOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e5e5e5] z-50 overflow-hidden">
                        <div className="p-4 border-b border-[#e5e5e5]">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Sort By</h3>
                            <button 
                              onClick={() => setIsFilterOpen(false)}
                              className="p-1 hover:bg-[#f5f5f5] rounded-full"
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
                
                <div className="flex items-center bg-white border border-[#e0e0e0] rounded-full overflow-hidden shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "px-5 py-3 transition-all duration-300",
                      viewMode === 'grid' 
                        ? "bg-[#111] text-white" 
                        : "text-[#777] hover:text-[#111] hover:bg-[#f5f5f5]"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('carousel')}
                    className={cn(
                      "px-5 py-3 transition-all duration-300",
                      viewMode === 'carousel' 
                        ? "bg-[#111] text-white" 
                        : "text-[#777] hover:text-[#111] hover:bg-[#f5f5f5]"
                    )}
                    aria-label="Carousel view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid View - True Edge to Edge */}
          {viewMode === 'grid' && (
            <div className="px-2 sm:px-4 lg:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {sortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product._id}
                    product={product}
                    priority={index < 4}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Carousel View - Full Width */}
          {viewMode === 'carousel' && (
            <div className="relative px-2 sm:px-4 lg:px-6">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                  {sortedProducts.map((product) => (
                    <CarouselItem 
                      key={product._id} 
                      className="pl-2 sm:pl-3 md:pl-4 basis-[60%] sm:basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious 
                  variant="light" 
                  className="left-4 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                />
                <CarouselNext 
                  variant="light" 
                  className="right-4 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                />
              </Carousel>
              
              {/* Mobile Swipe Hint */}
              <div className="flex justify-center mt-6 md:hidden">
                <span className="text-xs text-[#999] tracking-wider flex items-center gap-2">
                  <span className="w-8 h-px bg-[#ccc]" />
                  Swipe to explore
                  <span className="w-8 h-px bg-[#ccc]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* You May Also Like - Full Width Dark */}
      <section className="py-16 md:py-24 bg-[#111] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative w-full">
          {/* Header */}
          <div className="px-3 sm:px-6 lg:px-10 mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-white/60" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium">
                    Curated For You
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                  You May Also Like
                </h2>
              </div>
              <Link 
                href="/shop"
                className="hidden md:inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111] rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <span className="text-sm font-semibold tracking-wide">View All Drops</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative px-2 sm:px-4 lg:px-6">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                {recommendedProducts.map((product) => (
                  <CarouselItem 
                    key={product._id} 
                    className="pl-2 sm:pl-3 md:pl-4 basis-[60%] sm:basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                variant="dark" 
                className="left-4 hidden md:flex w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20"
              />
              <CarouselNext 
                variant="dark" 
                className="right-4 hidden md:flex w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20"
              />
            </Carousel>
          </div>
          
          {/* Mobile CTA */}
          <div className="flex justify-center mt-10 md:hidden px-6">
            <Link 
              href="/shop"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#111] rounded-full w-full max-w-xs"
            >
              <span className="text-sm font-semibold">View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
