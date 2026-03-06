/**
 * Landing Feature Hooks
 * TanStack Query hooks for landing page data
 */

import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts, getNewArrivals } from '@/api/services/products.service';
import { getCollections } from '@/api/services/collections.service';

// Query keys for landing feature
export const landingKeys = {
  all: ['landing'] as const,
  featured: () => [...landingKeys.all, 'featured'] as const,
  newArrivals: () => [...landingKeys.all, 'new-arrivals'] as const,
  collections: () => [...landingKeys.all, 'collections'] as const,
  banners: () => [...landingKeys.all, 'banners'] as const,
};

/**
 * Hook for featured products on landing page
 */
export function useFeaturedProducts(limit: number = 8) {
  return useQuery({
    queryKey: landingKeys.featured(),
    queryFn: () => getFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for new arrivals
 */
export function useNewArrivals(limit: number = 8) {
  return useQuery({
    queryKey: landingKeys.newArrivals(),
    queryFn: () => getNewArrivals(limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for featured collections
 */
export function useFeaturedCollections() {
  return useQuery({
    queryKey: landingKeys.collections(),
    queryFn: () => getCollections({ featured: true }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
