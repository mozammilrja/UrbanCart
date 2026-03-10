'use client';

import { useState, useMemo, useCallback } from 'react';
import { SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
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
  if (products.length === 0) return { min: 0, max: 10000 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 100) * 100,
    max: Math.ceil(Math.max(...prices) / 100) * 100,
  };
};

interface FilterableProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  className?: string;
}

export function FilterableProductGrid({
  products: allProducts,
  title,
  subtitle,
  showHeader = true,
  className,
}: FilterableProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract filter options from products
  const sizeOptions = useMemo(() => getUniqueSizes(allProducts), [allProducts]);
  const colorOptions = useMemo(() => getUniqueColors(allProducts), [allProducts]);
  const { min: priceMin, max: priceMax } = useMemo(() => getPriceRange(allProducts), [allProducts]);

  const initialFilters: FiltersState = useMemo(() => ({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [priceMin, priceMax],
  }), [priceMin, priceMax]);

  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

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
      case 'discount':
        return filtered.sort((a, b) => {
          const discountA = a.comparePrice ? (a.comparePrice - a.price) / a.comparePrice : 0;
          const discountB = b.comparePrice ? (b.comparePrice - b.price) / b.comparePrice : 0;
          return discountB - discountA;
        });
      default:
        return filtered;
    }
  }, [allProducts, filters, sortBy]);

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
            return { ...prev, sizes: prev.sizes.filter((s) => s !== filter.value) };
          case 'color':
            return { ...prev, colors: prev.colors.filter((c) => c !== filter.value) };
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

  const gridCols = viewMode === 'compact'
    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section className={cn('py-8 md:py-12', className)}>
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        {showHeader && (title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-neutral-500">
                <span className="font-semibold text-neutral-900">{filteredAndSortedProducts.length}</span> products
              </p>
            )}
          </div>
        )}

        {/* Main Content */}
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

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
              {/* Left Side */}
              <div className="flex items-center gap-4">
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

                {/* Results Count */}
                <span className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-900">
                    {filteredAndSortedProducts.length}
                  </span>{' '}
                  {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3">
                <SortDropdown value={sortBy} onChange={setSortBy} />

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-neutral-200 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-full transition-colors',
                      viewMode === 'grid'
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-500 hover:text-neutral-900'
                    )}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={cn(
                      'p-2 rounded-full transition-colors',
                      viewMode === 'compact'
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-500 hover:text-neutral-900'
                    )}
                    aria-label="Compact view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
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

            {/* Product Grid */}
            <div className={cn('grid gap-6', gridCols)}>
              {filteredAndSortedProducts.map((product, index) => (
                <OptimizedProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  priority={index < 4}
                />
              ))}
            </div>

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

            {/* Results Info */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-neutral-500">
                  Showing all {filteredAndSortedProducts.length} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </section>
  );
}
