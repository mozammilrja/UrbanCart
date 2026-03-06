/**
 * Shop Feature Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '@/api/services/products.service';
import type { ProductFilters } from '@/api/services/products.service';

// Query keys
export const shopKeys = {
  all: ['shop'] as const,
  products: (filters: ProductFilters) => [...shopKeys.all, 'products', filters] as const,
  search: (query: string, filters?: ProductFilters) => [...shopKeys.all, 'search', query, filters] as const,
};

/**
 * Hook for shop products with filters
 */
export function useShopProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: shopKeys.products(filters),
    queryFn: () => getProducts(filters),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Hook for product search
 */
export function useProductSearch(query: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: shopKeys.search(query, filters),
    queryFn: () => searchProducts(query, filters),
    enabled: query.length >= 2,
    staleTime: 1 * 60 * 1000,
  });
}
