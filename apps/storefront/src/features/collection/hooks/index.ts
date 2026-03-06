/**
 * Collection Feature Hooks
 */

import { useQuery } from '@tanstack/react-query';
import {
  getCollections,
  getCollectionBySlug,
  getCollectionProducts,
} from '@/api/services/collections.service';

// Query keys
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (filters?: object) => [...collectionKeys.lists(), filters] as const,
  details: () => [...collectionKeys.all, 'detail'] as const,
  detail: (slug: string) => [...collectionKeys.details(), slug] as const,
  products: (slug: string, filters?: object) =>
    [...collectionKeys.all, 'products', slug, filters] as const,
};

/**
 * Hook for all collections
 */
export function useCollections() {
  return useQuery({
    queryKey: collectionKeys.list(),
    queryFn: () => getCollections(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for collection detail
 */
export function useCollection(slug: string) {
  return useQuery({
    queryKey: collectionKeys.detail(slug),
    queryFn: () => getCollectionBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for collection products
 */
export function useCollectionProducts(
  slug: string,
  filters: { page?: number; limit?: number; sort?: string } = {}
) {
  return useQuery({
    queryKey: collectionKeys.products(slug, filters),
    queryFn: () => getCollectionProducts(slug, filters),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  });
}
