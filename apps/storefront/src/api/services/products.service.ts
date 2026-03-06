/**
 * Products Service
 * API calls for products
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { ApiResponse, PaginatedResponse } from '../core/client';
import type { Product, ProductColor } from '@/types';

// Product filters
export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  search?: string;
}

// Product detail response
export interface ProductDetail extends Product {
  relatedProducts?: Product[];
  reviews?: {
    average: number;
    count: number;
  };
}

/**
 * Get paginated products list
 */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>(
    ENDPOINTS.PRODUCTS.LIST,
    { params: filters }
  );
  return response.data;
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<ProductDetail> {
  const response = await apiClient.get<ApiResponse<ProductDetail>>(
    ENDPOINTS.PRODUCTS.DETAIL(id)
  );
  return response.data.data;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  const response = await apiClient.get<ApiResponse<ProductDetail>>(
    ENDPOINTS.PRODUCTS.BY_SLUG(slug)
  );
  return response.data.data;
}

/**
 * Search products
 */
export async function searchProducts(
  query: string,
  filters: Omit<ProductFilters, 'search'> = {}
): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>(
    ENDPOINTS.PRODUCTS.SEARCH,
    { params: { search: query, ...filters } }
  );
  return response.data;
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>(
    ENDPOINTS.PRODUCTS.FEATURED,
    { params: { limit } }
  );
  return response.data.data;
}

/**
 * Get new arrivals
 */
export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>(
    ENDPOINTS.PRODUCTS.NEW_ARRIVALS,
    { params: { limit } }
  );
  return response.data.data;
}

// Export service object for convenience
export const productsService = {
  getAll: getProducts,
  getById: getProductById,
  getBySlug: getProductBySlug,
  search: searchProducts,
  getFeatured: getFeaturedProducts,
  getNewArrivals: getNewArrivals,
};
