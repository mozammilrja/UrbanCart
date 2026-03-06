/**
 * Shop Feature Types
 */

import type { Product } from '@/types';

export interface ShopFilters {
  categories: string[];
  collections: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sort: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'name_asc' | 'name_desc';
  page: number;
  limit: number;
}

export interface ShopPageData {
  products: Product[];
  totalProducts: number;
  categories: { slug: string; name: string; count: number }[];
  priceRange: { min: number; max: number };
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export const DEFAULT_SHOP_FILTERS: ShopFilters = {
  categories: [],
  collections: [],
  sizes: [],
  colors: [],
  priceRange: [0, 50000],
  sort: 'newest',
  page: 1,
  limit: 12,
};
