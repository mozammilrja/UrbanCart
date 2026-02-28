import apiClient from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { Product } from '../../types/product';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    return apiClient.get<ProductsResponse>(ENDPOINTS.PRODUCTS.LIST, {
      params: filters as Record<string, string | number | boolean>,
    });
  },

  getById: async (id: string): Promise<Product> => {
    return apiClient.get<Product>(ENDPOINTS.PRODUCTS.DETAIL(id));
  },

  search: async (query: string): Promise<Product[]> => {
    return apiClient.get<Product[]>(ENDPOINTS.PRODUCTS.SEARCH, {
      params: { q: query },
    });
  },

  getCategories: async (): Promise<string[]> => {
    return apiClient.get<string[]>(ENDPOINTS.PRODUCTS.CATEGORIES);
  },
};

export default productsService;
