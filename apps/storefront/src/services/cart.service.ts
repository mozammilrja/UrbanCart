/**
 * UrbanCart Cart Service
 */

import {
  CartItem,
  CartState,
  initialCartItems,
  calculateCartTotals,
  availableCoupons,
  simulateDelay,
} from '@/mock';

const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

// In-memory cart state for mock mode
let mockCartItems: CartItem[] = [...initialCartItems];
let mockAppliedCoupon: string | null = null;

export const cartService = {
  /**
   * Get current cart state
   */
  async getCart(): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
      return {
        items: mockCartItems,
        appliedCoupon: mockAppliedCoupon,
        ...totals,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Add item to cart
   */
  async addItem(item: Omit<CartItem, 'id'>): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      
      const existingIndex = mockCartItems.findIndex(
        i => i.productId === item.productId && i.variantId === item.variantId
      );

      if (existingIndex >= 0) {
        // Update quantity if item already exists
        mockCartItems[existingIndex].quantity += item.quantity;
      } else {
        // Add new item
        mockCartItems.push({
          ...item,
          id: `cart_${Date.now()}`,
        });
      }

      const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
      return {
        items: mockCartItems,
        appliedCoupon: mockAppliedCoupon,
        ...totals,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Update item quantity
   */
  async updateQuantity(cartItemId: string, quantity: number): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      
      const index = mockCartItems.findIndex(i => i.id === cartItemId);
      if (index >= 0) {
        if (quantity <= 0) {
          mockCartItems.splice(index, 1);
        } else {
          mockCartItems[index].quantity = Math.min(quantity, mockCartItems[index].maxQuantity);
        }
      }

      const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
      return {
        items: mockCartItems,
        appliedCoupon: mockAppliedCoupon,
        ...totals,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Remove item from cart
   */
  async removeItem(cartItemId: string): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      mockCartItems = mockCartItems.filter(i => i.id !== cartItemId);
      
      const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
      return {
        items: mockCartItems,
        appliedCoupon: mockAppliedCoupon,
        ...totals,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(200);
      mockCartItems = [];
      mockAppliedCoupon = null;
      
      return {
        items: [],
        appliedCoupon: null,
        subtotal: 0,
        discount: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Apply coupon code
   */
  async applyCoupon(code: string): Promise<{ success: boolean; message: string; cart: CartState }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      
      const coupon = availableCoupons.find(c => c.code === code.toUpperCase());
      const subtotal = mockCartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      
      if (!coupon) {
        const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
        return {
          success: false,
          message: 'Invalid coupon code',
          cart: { items: mockCartItems, appliedCoupon: mockAppliedCoupon, ...totals },
        };
      }

      if (subtotal < coupon.minOrder) {
        const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
        return {
          success: false,
          message: `Minimum order of ₹${coupon.minOrder} required`,
          cart: { items: mockCartItems, appliedCoupon: mockAppliedCoupon, ...totals },
        };
      }

      mockAppliedCoupon = coupon.code;
      const totals = calculateCartTotals(mockCartItems, mockAppliedCoupon);
      
      return {
        success: true,
        message: coupon.type === 'percentage' 
          ? `${coupon.discount}% discount applied!`
          : `₹${coupon.discount} discount applied!`,
        cart: { items: mockCartItems, appliedCoupon: mockAppliedCoupon, ...totals },
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Remove applied coupon
   */
  async removeCoupon(): Promise<CartState> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(200);
      mockAppliedCoupon = null;
      
      const totals = calculateCartTotals(mockCartItems, null);
      return {
        items: mockCartItems,
        appliedCoupon: null,
        ...totals,
      };
    }

    throw new Error('API mode not implemented');
  },
};
