/**
 * Landing Feature Domain Logic
 */

import type { Product } from '@/types';

/**
 * Sort products by priority for landing page display
 */
export function sortProductsForDisplay(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    // Prioritize items with badges
    if (a.badge && !b.badge) return -1;
    if (!a.badge && b.badge) return 1;

    // Then by stock availability
    if (a.stock > 0 && b.stock === 0) return -1;
    if (a.stock === 0 && b.stock > 0) return 1;

    // Then by newness
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;

    return 0;
  });
}

/**
 * Filter products for hero section
 */
export function getHeroProducts(products: Product[], limit: number = 5): Product[] {
  return products
    .filter((p) => p.badge === 'DROP' || p.badge === 'NEW')
    .slice(0, limit);
}

/**
 * Group products by category for display
 */
export function groupProductsByCategory(
  products: Product[]
): Record<string, Product[]> {
  return products.reduce(
    (acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );
}
