'use client';

import { useQuery } from '@tanstack/react-query';
import { products as mockProducts } from '@/data/mock';
import type { Product } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/v1/products?limit=50`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data;
}

/**
 * Hook that fetches products from the API, falling back to mock data.
 * Used by pages that need the full product list for client-side filtering.
 */
export function useApiProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: fetchAllProducts,
    staleTime: 2 * 60 * 1000,
    placeholderData: mockProducts,
    retry: 1,
  });
}

async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/v1/products/featured?limit=8`);
  if (!res.ok) throw new Error('Failed to fetch featured products');
  const json = await res.json();
  return json.data;
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
    placeholderData: mockProducts.filter(p => p.isNew).slice(0, 8),
    retry: 1,
  });
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/v1/products/slug/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export function useApiProduct(slug: string) {
  return useQuery<Product | null>({
    queryKey: ['products', 'detail', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
