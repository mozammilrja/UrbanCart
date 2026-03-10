'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveFilter {
  type: 'category' | 'size' | 'color' | 'price';
  value: string;
  label: string;
  hex?: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (filter: ActiveFilter) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.map((filter, index) => (
        <button
          key={`${filter.type}-${filter.value}-${index}`}
          onClick={() => onRemove(filter)}
          className={cn(
            'group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
            'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
          )}
        >
          {filter.type === 'color' && filter.hex && (
            <span
              className="w-3 h-3 rounded-full ring-1 ring-neutral-300"
              style={{ backgroundColor: filter.hex }}
            />
          )}
          <span>{filter.label}</span>
          <X className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        </button>
      ))}
      
      <button
        onClick={onClearAll}
        className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2 ml-2 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}

export default ActiveFilters;
