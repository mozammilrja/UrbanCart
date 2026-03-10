'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption = 
  | 'recommended'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'popularity'
  | 'rating'
  | 'discount';

interface SortOptionItem {
  value: SortOption;
  label: string;
}

const sortOptions: SortOptionItem[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: "What's New" },
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'discount', label: 'Better Discount' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-full',
          'text-sm font-medium text-neutral-700',
          'hover:border-neutral-400 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2',
          isOpen && 'border-neutral-400'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-neutral-500">Sort by:</span>
        <span className="text-neutral-900">{selectedOption?.label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-neutral-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          'absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50',
          'transform transition-all duration-200 origin-top-right',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        )}
        role="listbox"
        aria-label="Sort options"
      >
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className={cn(
              'flex items-center justify-between w-full px-4 py-3 text-sm text-left transition-colors',
              value === option.value
                ? 'bg-neutral-50 text-neutral-900 font-medium'
                : 'text-neutral-700 hover:bg-neutral-50'
            )}
            role="option"
            aria-selected={value === option.value}
          >
            {option.label}
            {value === option.value && (
              <Check className="w-4 h-4 text-neutral-900" strokeWidth={2} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortDropdown;
