/**
 * Shop Feature Domain
 */

import type { ShopFilters } from '../types';
import type { Product } from '@/types';

/**
 * Build query string from filters
 */
export function buildFilterQuery(filters: Partial<ShopFilters>): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.categories?.length) {
    params.set('categories', filters.categories.join(','));
  }
  if (filters.collections?.length) {
    params.set('collections', filters.collections.join(','));
  }
  if (filters.sizes?.length) {
    params.set('sizes', filters.sizes.join(','));
  }
  if (filters.colors?.length) {
    params.set('colors', filters.colors.join(','));
  }
  if (filters.priceRange) {
    params.set('minPrice', filters.priceRange[0].toString());
    params.set('maxPrice', filters.priceRange[1].toString());
  }
  if (filters.sort) {
    params.set('sort', filters.sort);
  }
  if (filters.page) {
    params.set('page', filters.page.toString());
  }
  if (filters.limit) {
    params.set('limit', filters.limit.toString());
  }

  return params;
}

/**
 * Parse filters from URL search params
 */
export function parseFiltersFromUrl(searchParams: URLSearchParams): Partial<ShopFilters> {
  const filters: Partial<ShopFilters> = {};

  const categories = searchParams.get('categories');
  if (categories) filters.categories = categories.split(',');

  const collections = searchParams.get('collections');
  if (collections) filters.collections = collections.split(',');

  const sizes = searchParams.get('sizes');
  if (sizes) filters.sizes = sizes.split(',');

  const colors = searchParams.get('colors');
  if (colors) filters.colors = colors.split(',');

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice && maxPrice) {
    filters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
  }

  const sort = searchParams.get('sort');
  if (sort) filters.sort = sort as ShopFilters['sort'];

  const page = searchParams.get('page');
  if (page) filters.page = parseInt(page);

  const limit = searchParams.get('limit');
  if (limit) filters.limit = parseInt(limit);

  return filters;
}

/**
 * Count active filters
 */
export function countActiveFilters(filters: Partial<ShopFilters>): number {
  let count = 0;
  if (filters.categories?.length) count += filters.categories.length;
  if (filters.collections?.length) count += filters.collections.length;
  if (filters.sizes?.length) count += filters.sizes.length;
  if (filters.colors?.length) count += filters.colors.length;
  if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000)) count++;
  return count;
}
