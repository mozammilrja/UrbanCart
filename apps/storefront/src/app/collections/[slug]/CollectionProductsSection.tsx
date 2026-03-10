'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import { 
  ArrowRight, 
  Grid3X3, 
  LayoutGrid,
  SlidersHorizontal,
  TrendingUp,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { 
  FiltersSidebar, 
  MobileFilterDrawer, 
  ActiveFilters, 
  SortDropdown,
  type FiltersState,
  type SortOption 
} from '@/components/shop';

// Extract unique values from products
const getUniqueSizes = (products: Product[]) => {
  const sizes = new Set<string>();
  products.forEach((p) => p.sizes.forEach((s) => sizes.add(s)));
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'One Size', 'S/M', 'L/XL'];
  return Array.from(sizes)
    .sort((a, b) => {
      const aIdx = sizeOrder.indexOf(a);
      const bIdx = sizeOrder.indexOf(b);
      if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    })
    .map((value) => ({ value, label: value }));
};

const getUniqueColors = (products: Product[]) => {
  const colorsMap = new Map<string, { name: string; hex: string }>();
  products.forEach((p) =>
    p.colors.forEach((c) => {
      if (!colorsMap.has(c.hex)) {
        colorsMap.set(c.hex, { name: c.name, hex: c.hex });
      }
    })
  );
  return Array.from(colorsMap.values()).map((c) => ({
    value: c.hex,
    label: c.name,
    hex: c.hex,
  }));
};

const getPriceRange = (products: Product[]) => {
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 100) * 100,
    max: Math.ceil(Math.max(...prices) / 100) * 100,
  };
};

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
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Extract filter options from products
  const sizeOptions = useMemo(() => getUniqueSizes(displayProducts), [displayProducts]);
  const colorOptions = useMemo(() => getUniqueColors(displayProducts), [displayProducts]);
  const { min: priceMin, max: priceMax } = useMemo(() => getPriceRange(displayProducts), [displayProducts]);
  
  const initialFilters: FiltersState = useMemo(() => ({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [priceMin, priceMax],
  }), [priceMin, priceMax]);
  
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...displayProducts];

    // Filter by size
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    // Filter by color
    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.hex))
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'popularity':
        return filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
      default:
        return filtered;
    }
  }, [displayProducts, filters, sortBy]);

  // Build active filters for chips
  const activeFilters = useMemo(() => {
    const active: Array<{
      type: 'category' | 'size' | 'color' | 'price';
      value: string;
      label: string;
      hex?: string;
    }> = [];

    filters.sizes.forEach((size) => {
      active.push({ type: 'size', value: size, label: `Size: ${size}` });
    });

    filters.colors.forEach((hex) => {
      const color = colorOptions.find((c) => c.hex === hex);
      if (color) {
        active.push({ type: 'color', value: hex, label: color.label, hex });
      }
    });

    if (filters.priceRange[0] > priceMin || filters.priceRange[1] < priceMax) {
      active.push({
        type: 'price',
        value: 'price',
        label: `₹${filters.priceRange[0].toLocaleString('en-IN')} - ₹${filters.priceRange[1].toLocaleString('en-IN')}`,
      });
    }

    return active;
  }, [filters, colorOptions, priceMin, priceMax]);

  const handleRemoveFilter = useCallback(
    (filter: { type: 'category' | 'size' | 'color' | 'price'; value: string }) => {
      setFilters((prev) => {
        switch (filter.type) {
          case 'size':
            return {
              ...prev,
              sizes: prev.sizes.filter((s) => s !== filter.value),
            };
          case 'color':
            return {
              ...prev,
              colors: prev.colors.filter((c) => c !== filter.value),
            };
          case 'price':
            return { ...prev, priceRange: [priceMin, priceMax] };
          default:
            return prev;
        }
      });
    },
    [priceMin, priceMax]
  );

  const handleClearAll = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const activeFiltersCount =
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > priceMin || filters.priceRange[1] < priceMax ? 1 : 0);

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

        <div className="relative w-full px-4 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-[#111]" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#555] font-medium">
                    The Collection
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2">
                  {collectionName}
                </h2>
                <p className="text-base text-neutral-500">
                  <span className="font-semibold text-neutral-900">{filteredAndSortedProducts.length}</span> exclusive pieces
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-neutral-900 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <SortDropdown value={sortBy} onChange={setSortBy} />
                
                {/* View Toggle */}
                <div className="flex items-center bg-white border border-neutral-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2.5 transition-all duration-200",
                      viewMode === 'grid' 
                        ? "bg-neutral-900 text-white" 
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('carousel')}
                    className={cn(
                      "p-2.5 transition-all duration-200",
                      viewMode === 'carousel' 
                        ? "bg-neutral-900 text-white" 
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                    aria-label="Carousel view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <ActiveFilters
            filters={activeFilters}
            onRemove={handleRemoveFilter}
            onClearAll={handleClearAll}
            className="mb-6"
          />

          {/* Main Content with Sidebar */}
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FiltersSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  categoryOptions={[]}
                  colorOptions={colorOptions}
                  sizeOptions={sizeOptions}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  productCount={filteredAndSortedProducts.length}
                  onClearAll={handleClearAll}
                />
              </div>
            </div>

            {/* Products Area */}
            <div className="flex-1 min-w-0">
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredAndSortedProducts.map((product, index) => (
                    <OptimizedProductCard 
                      key={product._id}
                      product={product}
                      index={index}
                      priority={index < 4}
                    />
                  ))}
                </div>
              )}

              {/* Carousel View */}
              {viewMode === 'carousel' && (
                <div className="relative">
                  <Carousel
                    opts={{
                      align: 'start',
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {filteredAndSortedProducts.map((product, index) => (
                        <CarouselItem 
                          key={product._id} 
                          className="pl-4 basis-[70%] sm:basis-[45%] md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
                        >
                          <OptimizedProductCard product={product} index={index} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious 
                      variant="light" 
                      className="left-2 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                    />
                    <CarouselNext 
                      variant="light" 
                      className="right-2 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                    />
                  </Carousel>
                  
                  {/* Mobile Swipe Hint */}
                  <div className="flex justify-center mt-6 md:hidden">
                    <span className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
                      <span className="w-8 h-px bg-neutral-300" />
                      Swipe to explore
                      <span className="w-8 h-px bg-neutral-300" />
                    </span>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                    <SlidersHorizontal className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                    Try adjusting your filters to see more products.
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        categoryOptions={[]}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
        priceMin={priceMin}
        priceMax={priceMax}
        productCount={filteredAndSortedProducts.length}
        onClearAll={handleClearAll}
      />

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
                {recommendedProducts.map((product, index) => (
                  <CarouselItem 
                    key={product._id} 
                    className="pl-2 sm:pl-3 md:pl-4 basis-[60%] sm:basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <OptimizedProductCard product={product} index={index} />
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
