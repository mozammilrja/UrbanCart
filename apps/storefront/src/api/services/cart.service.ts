/**
 * Cart Service
 * API calls for shopping cart
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { ApiResponse } from '../core/client';
import type { Product } from '@/types';

// Cart item type
export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

// Cart type
export interface Cart {
  _id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  itemCount: number;
}

// Add to cart request
export interface AddToCartRequest {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

// Update cart item request
export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

// Coupon response
export interface CouponResponse {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  message: string;
}

/**
 * Get cart
 */
export async function getCart(): Promise<Cart> {
  const response = await apiClient.get<ApiResponse<Cart>>(ENDPOINTS.CART.GET);
  return response.data.data;
}

/**
 * Add item to cart
 */
export async function addToCart(data: AddToCartRequest): Promise<Cart> {
  const response = await apiClient.post<ApiResponse<Cart>>(
    ENDPOINTS.CART.ADD,
    data
  );
  return response.data.data;
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(data: UpdateCartItemRequest): Promise<Cart> {
  const response = await apiClient.patch<ApiResponse<Cart>>(
    ENDPOINTS.CART.UPDATE,
    data
  );
  return response.data.data;
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string): Promise<Cart> {
  const response = await apiClient.delete<ApiResponse<Cart>>(
    ENDPOINTS.CART.REMOVE(itemId)
  );
  return response.data.data;
}

/**
 * Clear cart
 */
export async function clearCart(): Promise<Cart> {
  const response = await apiClient.delete<ApiResponse<Cart>>(
    ENDPOINTS.CART.CLEAR
  );
  return response.data.data;
}

/**
 * Apply coupon code
 */
export async function applyCoupon(code: string): Promise<CouponResponse> {
  const response = await apiClient.post<ApiResponse<CouponResponse>>(
    ENDPOINTS.CART.APPLY_COUPON,
    { code }
  );
  return response.data.data;
}

/**
 * Remove coupon
 */
export async function removeCoupon(): Promise<Cart> {
  const response = await apiClient.delete<ApiResponse<Cart>>(
    ENDPOINTS.CART.REMOVE_COUPON
  );
  return response.data.data;
}

// Export service object
export const cartService = {
  get: getCart,
  addItem: addToCart,
  updateItem: updateCartItem,
  removeItem: removeFromCart,
  clear: clearCart,
  applyCoupon,
  removeCoupon,
};
