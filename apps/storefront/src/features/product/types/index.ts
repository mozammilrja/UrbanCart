/**
 * Product Feature Types
 */

import type { Product, ProductColor } from '@/types';

export interface ProductVariant {
  size: string;
  color: ProductColor;
  stock: number;
  sku: string;
}

export interface ProductReview {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface ProductGalleryImage {
  src: string;
  alt: string;
  color?: string;
}

export interface SizeGuide {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
}

export interface ProductPageData {
  product: Product;
  relatedProducts: Product[];
  reviews: {
    items: ProductReview[];
    average: number;
    count: number;
    distribution: Record<number, number>;
  };
}
