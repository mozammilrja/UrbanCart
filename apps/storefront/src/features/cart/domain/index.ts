/**
 * Cart Feature Domain Logic
 */

import type { CartItem, CartSummary } from '../types';

const TAX_RATE = 0.18; // 18% GST
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 199;

/**
 * Calculate cart subtotal
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Calculate shipping cost
 */
export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/**
 * Calculate tax
 */
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE);
}

/**
 * Calculate cart summary
 */
export function calculateCartSummary(
  items: CartItem[],
  discount: number = 0
): CartSummary {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax - discount;

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total: Math.max(0, total),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

/**
 * Check if cart is empty
 */
export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0;
}

/**
 * Get amount remaining for free shipping
 */
export function getAmountForFreeShipping(subtotal: number): number {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return remaining > 0 ? remaining : 0;
}

/**
 * Check if item exists in cart
 */
export function findCartItem(
  items: CartItem[],
  productId: string,
  size: string,
  colorName: string
): CartItem | undefined {
  return items.find(
    (item) =>
      item.product._id === productId &&
      item.size === size &&
      item.color.name === colorName
  );
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}
