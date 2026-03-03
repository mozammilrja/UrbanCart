/**
 * Extended types for storefront
 * Extends base types from @urbancart/types with storefront-specific properties
 */

import type { Product, ProductImage, Collection } from '@urbancart/types';

/**
 * Extended Product type with additional storefront-specific properties
 */
export interface StorefrontProduct extends Omit<Product, 'images'> {
  /** Simple image URLs for storefront display */
  images: string[];
  /** Brand name for display */
  brand?: string;
  /** Whether this is a limited edition item */
  isLimited?: boolean;
}

/**
 * Extended Collection type with required image
 */
export interface StorefrontCollection extends Omit<Collection, 'image'> {
  /** Required image URL for storefront display */
  image: string;
}

/**
 * Helper to convert Product to StorefrontProduct
 */
export function toStorefrontProduct(product: Product): StorefrontProduct {
  return {
    ...product,
    images: product.images.map((img: ProductImage) => img.url),
    brand: product.category?.name || 'UrbanCart',
    isLimited: product.tags?.includes('limited') || false,
  };
}

/**
 * Helper to get primary image URL from a product
 */
export function getProductImageUrl(product: Product, index: number = 0): string {
  if (product.images && product.images.length > index) {
    return product.images[index].url;
  }
  return product.featuredImage || '/placeholder.jpg';
}

/**
 * Color swatch type for product display
 */
export interface ColorSwatch {
  name: string;
  hex: string;
}

/**
 * Extract unique colors from product variants
 */
export function getProductColors(product: Product): ColorSwatch[] {
  if (!product.variants) return [];
  
  const colorMap = new Map<string, ColorSwatch>();
  
  for (const variant of product.variants) {
    if (variant.color && variant.colorCode) {
      colorMap.set(variant.color, { name: variant.color, hex: variant.colorCode });
    }
  }
  
  return Array.from(colorMap.values());
}
