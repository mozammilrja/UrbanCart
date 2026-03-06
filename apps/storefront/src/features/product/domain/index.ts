/**
 * Product Feature Domain Logic
 */

import type { Product, ProductColor } from '@/types';

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: number, comparePrice?: number): number {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.stock > 0;
}

/**
 * Check if product has low stock
 */
export function isLowStock(product: Product, threshold: number = 5): boolean {
  return product.stock > 0 && product.stock <= threshold;
}

/**
 * Get stock status message
 */
export function getStockStatus(product: Product): string {
  if (product.stock === 0) return 'Out of Stock';
  if (product.stock <= 3) return `Only ${product.stock} left`;
  if (product.stock <= 10) return 'Low Stock';
  return 'In Stock';
}

/**
 * Get available sizes (in stock)
 */
export function getAvailableSizes(product: Product): string[] {
  // In a real app, this would check variant stock
  return product.sizes;
}

/**
 * Get color by name
 */
export function getColorByName(
  colors: ProductColor[],
  name: string
): ProductColor | undefined {
  return colors.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

/**
 * Format product price for display
 */
export function formatProductPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get product badge color
 */
export function getBadgeColor(badge: Product['badge']): string {
  switch (badge) {
    case 'NEW':
      return 'bg-green-500';
    case 'DROP':
      return 'bg-purple-500';
    case 'LIMITED':
      return 'bg-orange-500';
    case 'SOLD OUT':
      return 'bg-gray-500';
    default:
      return 'bg-black';
  }
}

/**
 * Generate product schema for SEO
 */
export function generateProductSchema(product: Product): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product._id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
  };
}
