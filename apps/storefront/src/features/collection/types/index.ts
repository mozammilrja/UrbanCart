/**
 * Collection Feature Types
 */

import type { Collection, Product } from '@/types';

export interface CollectionPageData {
  collection: Collection;
  products: Product[];
  totalProducts: number;
}

export interface CollectionFilter {
  sizes?: string[];
  colors?: string[];
  priceRange?: [number, number];
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}
