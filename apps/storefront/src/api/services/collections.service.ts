/**
 * Collections Service
 * API calls for collections
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { ApiResponse, PaginatedResponse } from '../core/client';
import type { Collection, Product } from '@/types';

// Collection with products
export interface CollectionWithProducts extends Collection {
  products: Product[];
}

// Collection filters
export interface CollectionFilters {
  page?: number;
  limit?: number;
  featured?: boolean;
}

/**
 * Get all collections
 */
export async function getCollections(
  filters: CollectionFilters = {}
): Promise<Collection[]> {
  const response = await apiClient.get<ApiResponse<Collection[]>>(
    ENDPOINTS.COLLECTIONS.LIST,
    { params: filters }
  );
  return response.data.data;
}

/**
 * Get collection by ID
 */
export async function getCollectionById(id: string): Promise<Collection> {
  const response = await apiClient.get<ApiResponse<Collection>>(
    ENDPOINTS.COLLECTIONS.DETAIL(id)
  );
  return response.data.data;
}

/**
 * Get collection by slug
 */
export async function getCollectionBySlug(
  slug: string
): Promise<CollectionWithProducts> {
  const response = await apiClient.get<ApiResponse<CollectionWithProducts>>(
    ENDPOINTS.COLLECTIONS.BY_SLUG(slug)
  );
  return response.data.data;
}

/**
 * Get products in a collection
 */
export async function getCollectionProducts(
  slug: string,
  filters: { page?: number; limit?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>(
    ENDPOINTS.COLLECTIONS.PRODUCTS(slug),
    { params: filters }
  );
  return response.data;
}

// Export service object
export const collectionsService = {
  getAll: getCollections,
  getById: getCollectionById,
  getBySlug: getCollectionBySlug,
  getProducts: getCollectionProducts,
};
