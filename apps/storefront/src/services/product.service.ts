/**
 * UrbanCart Product Service
 * API-ready service layer with mock/API mode switching
 */

import type { Product } from '@urbancart/types';
import {
  mockProducts,
  getProductById as getMockProductById,
  getProductBySlug as getMockProductBySlug,
  getFeaturedProducts as getMockFeaturedProducts,
  getNewArrivals as getMockNewArrivals,
  getBestsellers as getMockBestsellers,
  getProductsByCategory as getMockProductsByCategory,
  getProductsByCollection as getMockProductsByCollection,
  searchProducts as mockSearchProducts,
  getRelatedProducts as getMockRelatedProducts,
  simulateDelay,
} from '@/mock';

// Environment mode: 'MOCK' | 'API'
const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

export interface ProductFilters {
  category?: string;
  collection?: string;
  search?: string;
  sort?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  priceMin?: number;
  priceMax?: number;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Apply filters and sorting to products array
 */
function applyFiltersAndSort(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(p => p.category.slug === filters.category);
  }

  // Collection filter
  if (filters.collection) {
    filtered = filtered.filter(p => 
      p.collections.some(c => typeof c === 'object' && c.slug === filters.collection)
    );
  }

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  // Price range filter
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }

  // Size filter
  if (filters.sizes?.length) {
    filtered = filtered.filter(p => 
      p.variants.some(v => filters.sizes!.includes(v.size || ''))
    );
  }

  // Color filter
  if (filters.colors?.length) {
    filtered = filtered.filter(p => 
      p.variants.some(v => filters.colors!.includes(v.color || ''))
    );
  }

  // Stock filter
  if (filters.inStock) {
    filtered = filtered.filter(p => p.inventory.quantity > 0);
  }

  // Featured filter
  if (filters.featured) {
    filtered = filtered.filter(p => p.isFeatured);
  }

  // Sorting
  switch (filters.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default: // featured
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return filtered;
}

/**
 * Apply pagination to products array
 */
function applyPagination<T>(items: T[], page = 1, limit = 12): PaginatedResponse<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
      hasMore: endIndex < items.length,
    },
  };
}

export const productService = {
  /**
   * Get all products with optional filtering and pagination
   */
  async getAll(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(600);
      const filtered = applyFiltersAndSort(mockProducts, filters);
      return applyPagination(filtered, filters.page || 1, filters.limit || 12);
    }

    // API mode - to be implemented when backend is ready
    // return apiClient.get('/products', { params: filters });
    throw new Error('API mode not implemented');
  },

  /**
   * Get a single product by ID or slug
   */
  async getById(idOrSlug: string): Promise<Product | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      const product = getMockProductById(idOrSlug) || getMockProductBySlug(idOrSlug);
      return product || null;
    }

    // API mode
    // return apiClient.get(`/products/${idOrSlug}`);
    throw new Error('API mode not implemented');
  },

  /**
   * Get a single product by slug
   */
  async getBySlug(slug: string): Promise<Product | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      const product = getMockProductBySlug(slug);
      return product || null;
    }

    // API mode
    // return apiClient.get(`/products/slug/${slug}`);
    throw new Error('API mode not implemented');
  },

  /**
   * Get featured products for homepage
   */
  async getFeatured(limit = 8): Promise<Product[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      return getMockFeaturedProducts(limit);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get new arrivals
   */
  async getNewArrivals(limit = 8): Promise<Product[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      return getMockNewArrivals(limit);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get bestsellers
   */
  async getBestsellers(limit = 8): Promise<Product[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      return getMockBestsellers(limit);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get products by category
   */
  async getByCategory(categorySlug: string, limit?: number): Promise<Product[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      return getMockProductsByCategory(categorySlug, limit);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get products by collection
   */
  async getByCollection(collectionSlug: string, filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      const collectionProducts = getMockProductsByCollection(collectionSlug);
      const filtered = applyFiltersAndSort(collectionProducts, filters);
      return applyPagination(filtered, filters.page || 1, filters.limit || 12);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Search products
   */
  async search(query: string, filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      const searchResults = mockSearchProducts(query);
      const filtered = applyFiltersAndSort(searchResults, filters);
      return applyPagination(filtered, filters.page || 1, filters.limit || 12);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get related products
   */
  async getRelated(productId: string, limit = 4): Promise<Product[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockRelatedProducts(productId, limit);
    }

    throw new Error('API mode not implemented');
  },
};
