/**
 * UrbanCart Search Service
 */

import type { Product } from '@urbancart/types';
import {
  SearchSuggestion,
  SearchFilters,
  trendingSearches,
  recentSearches,
  popularCategories,
  popularCollections,
  simulateDelay,
} from '@/mock';
import { productService } from './product.service';

const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

export interface SearchResponse {
  products: Product[];
  suggestions: SearchSuggestion[];
  total: number;
  filters: SearchFilters;
}

export const searchService = {
  /**
   * Get search suggestions based on query
   */
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(200);
      
      if (!query.trim()) {
        return [
          ...recentSearches,
          ...popularCollections.slice(0, 2),
        ];
      }

      // Generate mock suggestions based on query
      const results = await productService.search(query, { limit: 5 });
      const productSuggestions: SearchSuggestion[] = results.data.map(p => ({
        type: 'product',
        text: p.name,
        href: `/product/${p.slug}`,
        image: p.images[0]?.url,
        price: p.price,
      }));

      // Add category suggestions
      const categorySuggestions = popularCategories.filter(c => 
        c.text.toLowerCase().includes(query.toLowerCase())
      );

      return [...productSuggestions, ...categorySuggestions].slice(0, 8);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get trending searches
   */
  async getTrending(): Promise<string[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(150);
      return trendingSearches;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get recent searches (from local storage in real implementation)
   */
  async getRecent(): Promise<SearchSuggestion[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(100);
      return recentSearches;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Save search to history
   */
  async saveSearch(query: string): Promise<void> {
    if (DATA_MODE === 'MOCK') {
      // In real implementation, save to localStorage or API
      console.log('Saved search:', query);
      return;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Clear search history
   */
  async clearHistory(): Promise<void> {
    if (DATA_MODE === 'MOCK') {
      // In real implementation, clear localStorage or API
      return;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Full search with filters
   */
  async search(query: string, filters: SearchFilters = {}): Promise<SearchResponse> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      
      const results = await productService.search(query, filters);
      
      return {
        products: results.data,
        suggestions: [],
        total: results.pagination.total,
        filters,
      };
    }

    throw new Error('API mode not implemented');
  },
};
