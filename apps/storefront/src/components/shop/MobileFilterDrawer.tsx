'use client';

import { useEffect, useRef } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FiltersSidebar, type FiltersState } from './FiltersSidebar';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  hex?: string;
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  categoryOptions: FilterOption[];
  colorOptions: FilterOption[];
  sizeOptions: FilterOption[];
  priceMin?: number;
  priceMax?: number;
  productCount: number;
  onClearAll: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  categoryOptions,
  colorOptions,
  sizeOptions,
  priceMin = 0,
  priceMax = 10000,
  productCount,
  onClearAll,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > priceMin || filters.priceRange[1] < priceMax ? 1 : 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 shadow-2xl lg:hidden',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-neutral-900 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto px-4 py-2">
          <FiltersSidebar
            filters={filters}
            onFiltersChange={onFiltersChange}
            categoryOptions={categoryOptions}
            colorOptions={colorOptions}
            sizeOptions={sizeOptions}
            priceMin={priceMin}
            priceMax={priceMax}
            productCount={productCount}
            onClearAll={onClearAll}
          />
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white border-t border-neutral-200 flex gap-3">
          <button
            onClick={onClearAll}
            className="flex-1 py-3 px-4 border-2 border-neutral-900 text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
          >
            Show {productCount} Results
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileFilterDrawer;
