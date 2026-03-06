/**
 * Cart Feature Types
 */

import type { Product, ProductColor } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: ProductColor;
  addedAt: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartState {
  items: CartItem[];
  couponCode?: string;
  isLoading: boolean;
  error?: string;
}

export interface AddToCartInput {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface UpdateCartItemInput {
  itemId: string;
  quantity: number;
}
