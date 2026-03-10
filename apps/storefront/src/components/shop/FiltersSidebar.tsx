'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  hex?: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  type?: 'checkbox' | 'color' | 'size';
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  options,
  selected,
  onToggle,
  type = 'checkbox',
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        )}
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}
      >
        {type === 'checkbox' && (
          <div className="space-y-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group py-1"
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
                    selected.includes(option.value)
                      ? 'bg-neutral-900 border-neutral-900'
                      : 'border-neutral-300 group-hover:border-neutral-500'
                  )}
                >
                  {selected.includes(option.value) && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="flex-1 text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  {option.label}
                </span>
                {option.count !== undefined && (
                  <span className="text-xs text-neutral-400">({option.count})</span>
                )}
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => onToggle(option.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        )}

        {type === 'color' && (
          <div className="flex flex-wrap gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onToggle(option.value)}
                className="group relative"
                title={option.label}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full transition-all duration-200',
                    selected.includes(option.value)
                      ? 'ring-2 ring-offset-2 ring-neutral-900'
                      : 'ring-1 ring-neutral-200 group-hover:ring-neutral-400'
                  )}
                  style={{ backgroundColor: option.hex || option.value }}
                />
                {selected.includes(option.value) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={cn(
                        'w-4 h-4',
                        option.hex === '#FFFFFF' || option.hex === '#ffffff'
                          ? 'text-neutral-900'
                          : 'text-white'
                      )}
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {type === 'size' && (
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onToggle(option.value)}
                className={cn(
                  'min-w-[44px] h-10 px-3 text-sm font-medium rounded-md border-2 transition-all duration-200',
                  selected.includes(option.value)
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PriceRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

function PriceRangeFilter({ min, max, value, onChange }: PriceRangeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localMax - 100);
    setLocalMin(newMin);
    onChange([newMin, localMax]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localMin + 100);
    setLocalMax(newMax);
    onChange([localMin, newMax]);
  };

  const leftPercent = ((localMin - min) / (max - min)) * 100;
  const rightPercent = ((localMax - min) / (max - min)) * 100;

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          Price Range
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        )}
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-48 pb-4' : 'max-h-0'
        )}
      >
        {/* Price display */}
        <div className="flex items-center justify-between mb-4">
          <div className="px-3 py-2 bg-neutral-100 rounded-md text-sm font-medium">
            ₹{localMin.toLocaleString('en-IN')}
          </div>
          <span className="text-neutral-400">—</span>
          <div className="px-3 py-2 bg-neutral-100 rounded-md text-sm font-medium">
            ₹{localMax.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Range slider */}
        <div className="relative h-2 bg-neutral-200 rounded-full">
          {/* Active range */}
          <div
            className="absolute h-full bg-neutral-900 rounded-full"
            style={{
              left: `${leftPercent}%`,
              right: `${100 - rightPercent}%`,
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={localMin}
            onChange={handleMinChange}
            className="absolute w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
            style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={localMax}
            onChange={handleMaxChange}
            className="absolute w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
            style={{ zIndex: 4 }}
          />
        </div>
      </div>
    </div>
  );
}

export interface FiltersState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

interface FiltersSidebarProps {
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

export function FiltersSidebar({
  filters,
  onFiltersChange,
  categoryOptions,
  colorOptions,
  sizeOptions,
  priceMin = 0,
  priceMax = 10000,
  productCount,
  onClearAll,
}: FiltersSidebarProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > priceMin ||
    filters.priceRange[1] < priceMax;

  const toggleCategory = (value: string) => {
    const newCategories = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleSize = (value: string) => {
    const newSizes = filters.sizes.includes(value)
      ? filters.sizes.filter((s) => s !== value)
      : [...filters.sizes, value];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const toggleColor = (value: string) => {
    const newColors = filters.colors.includes(value)
      ? filters.colors.filter((c) => c !== value)
      : [...filters.colors, value];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (priceRange: [number, number]) => {
    onFiltersChange({ ...filters, priceRange });
  };

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="py-3 text-sm text-neutral-500">
        {productCount} {productCount === 1 ? 'product' : 'products'}
      </div>

      {/* Filter Sections */}
      <div>
        {categoryOptions.length > 0 && (
          <FilterSection
            title="Category"
            options={categoryOptions}
            selected={filters.categories}
            onToggle={toggleCategory}
            type="checkbox"
            defaultOpen={true}
          />
        )}

        {sizeOptions.length > 0 && (
          <FilterSection
            title="Size"
            options={sizeOptions}
            selected={filters.sizes}
            onToggle={toggleSize}
            type="size"
            defaultOpen={true}
          />
        )}

        {colorOptions.length > 0 && (
          <FilterSection
            title="Color"
            options={colorOptions}
            selected={filters.colors}
            onToggle={toggleColor}
            type="color"
            defaultOpen={true}
          />
        )}

        <PriceRangeFilter
          min={priceMin}
          max={priceMax}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
      </div>
    </aside>
  );
}

export default FiltersSidebar;
