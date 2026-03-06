/**
 * Shared Feature Utilities
 * Common utilities used across features
 */

// Re-export common utilities
export { cn } from '@/lib/utils';

// Common validation schemas
export { z } from 'zod';

// Common types
export type { Product, Collection, StoreLocation } from '@/types';

// SEO helpers
export function generatePageTitle(title: string): string {
  return `${title} | APOSTLE`;
}

export function generateMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + '...';
}

// URL helpers
export function getProductUrl(slug: string): string {
  return `/product/${slug}`;
}

export function getCollectionUrl(slug: string): string {
  return `/collections/${slug}`;
}

export function getCategoryUrl(slug: string): string {
  return `/category/${slug}`;
}

// Image helpers
export function getOptimizedImageUrl(url: string, width: number = 800): string {
  // Add image optimization params if using a CDN
  return url;
}

export function getPlaceholderImage(type: 'product' | 'collection' | 'avatar' = 'product'): string {
  const placeholders = {
    product: '/images/placeholder-product.jpg',
    collection: '/images/placeholder-collection.jpg',
    avatar: '/images/placeholder-avatar.jpg',
  };
  return placeholders[type];
}
