/**
 * Collection Feature Domain
 */

import type { Collection, Product } from '@/types';

/**
 * Sort collections by product count
 */
export function sortCollectionsByPopularity(collections: Collection[]): Collection[] {
  return [...collections].sort((a, b) => b.productCount - a.productCount);
}

/**
 * Get collection display image
 */
export function getCollectionImage(collection: Collection): string {
  return collection.bannerImage || '/images/placeholder-collection.jpg';
}

/**
 * Generate collection page title
 */
export function getCollectionPageTitle(collection: Collection): string {
  return `${collection.name} Collection | APOSTLE`;
}

/**
 * Generate collection meta description
 */
export function getCollectionMetaDescription(collection: Collection): string {
  return collection.description || `Shop the ${collection.name} collection at APOSTLE. Premium Indian streetwear.`;
}
