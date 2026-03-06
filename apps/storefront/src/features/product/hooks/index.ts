/**
 * Product Feature Hooks
 * TanStack Query hooks for product data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductBySlug, getProducts } from '@/api/services/products.service';
import type { ProductFilters } from '@/api/services/products.service';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  related: (slug: string) => [...productKeys.all, 'related', slug] as const,
  reviews: (slug: string) => [...productKeys.all, 'reviews', slug] as const,
};

/**
 * Hook for product detail by slug
 */
export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for products list with filters
 */
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook for related products
 */
export function useRelatedProducts(slug: string, limit: number = 4) {
  return useQuery({
    queryKey: productKeys.related(slug),
    queryFn: async () => {
      const product = await getProductBySlug(slug);
      const related = await getProducts({
        category: product.categorySlug,
        limit,
      });
      // Filter out current product
      return related.data.filter((p) => p.slug !== slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to prefetch product data
 */
export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(slug),
      queryFn: () => getProductBySlug(slug),
      staleTime: 5 * 60 * 1000,
    });
  };
}
