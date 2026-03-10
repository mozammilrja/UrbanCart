'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { products } from '@/data/mock';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import { 
  FiltersSidebar, 
  MobileFilterDrawer, 
  ActiveFilters, 
  SortDropdown,
  type FiltersState,
  type SortOption 
} from '@/components/shop';
import { cn } from '@/lib/utils';

// Extract unique values from products
const getUniqueCategories = () => {
  const categories: Record<string, number> = {};
  products.forEach((p) => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  return Object.entries(categories).map(([value, count]) => ({
    value,
    label: value,
    count,
  }));
};

const getUniqueSizes = () => {
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

const getUniqueColors = () => {
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

const getPriceRange = () => {
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 100) * 100,
    max: Math.ceil(Math.max(...prices) / 100) * 100,
  };
};

const categoryOptions = getUniqueCategories();
const sizeOptions = getUniqueSizes();
const colorOptions = getUniqueColors();
const { min: priceMin, max: priceMax } = getPriceRange();

const initialFilters: FiltersState = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: [priceMin, priceMax],
};

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }

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
  }, [sortBy, filters]);

  // Build active filters for chips
  const activeFilters = useMemo(() => {
    const active: Array<{
      type: 'category' | 'size' | 'color' | 'price';
      value: string;
      label: string;
      hex?: string;
    }> = [];

    filters.categories.forEach((cat) => {
      active.push({ type: 'category', value: cat, label: cat });
    });

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
  }, [filters]);

  const handleRemoveFilter = useCallback(
    (filter: { type: 'category' | 'size' | 'color' | 'price'; value: string }) => {
      setFilters((prev) => {
        switch (filter.type) {
          case 'category':
            return {
              ...prev,
              categories: prev.categories.filter((c) => c !== filter.value),
            };
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
    []
  );

  const handleClearAll = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > priceMin || filters.priceRange[1] < priceMax ? 1 : 0);

  const gridCols =
    viewMode === 'compact'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-neutral-100 to-white py-10 md:py-14">
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 font-medium">Shop</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
            Shop All
          </h1>
          <p className="mt-3 text-neutral-500 max-w-2xl">
            Explore our complete collection of premium streetwear. Quality craftsmanship meets contemporary design.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FiltersSidebar
                filters={filters}
                onFiltersChange={setFilters}
                categoryOptions={categoryOptions}
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
              {/* Left Side - Mobile Filter Button & Results Count */}
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

              {/* Right Side - Sort & View Toggle */}
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
                  Try adjusting your filters or clearing them to see more products.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Hint */}
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
        categoryOptions={categoryOptions}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
        priceMin={priceMin}
        priceMax={priceMax}
        productCount={filteredAndSortedProducts.length}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
