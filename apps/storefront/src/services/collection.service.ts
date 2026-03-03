/**
 * UrbanCart Collection Service
 */

import type { Collection } from '@urbancart/types';
import {
  mockCollections,
  getCollectionBySlug as getMockCollectionBySlug,
  getCollectionById as getMockCollectionById,
  getFeaturedCollections as getMockFeaturedCollections,
  simulateDelay,
} from '@/mock';

const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

export const collectionService = {
  /**
   * Get all collections
   */
  async getAll(): Promise<Collection[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      return mockCollections;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get collection by slug
   */
  async getBySlug(slug: string): Promise<Collection | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockCollectionBySlug(slug) || null;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get collection by ID
   */
  async getById(id: string): Promise<Collection | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockCollectionById(id) || null;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get featured collections for homepage
   */
  async getFeatured(limit = 4): Promise<Collection[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockFeaturedCollections(limit);
    }

    throw new Error('API mode not implemented');
  },
};
