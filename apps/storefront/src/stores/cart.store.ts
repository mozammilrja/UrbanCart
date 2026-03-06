/**
 * Cart Store
 * Shopping cart state management with Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, ProductColor } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: ProductColor;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  isOpen: boolean;
}

interface CartActions {
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCoupon: (code: string | null) => void;
  setCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

interface CartComputed {
  itemCount: number;
  subtotal: number;
  isEmpty: boolean;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  couponCode: null,
  isOpen: false,
};

// Generate unique cart item ID
function generateCartItemId(productId: string, size: string, colorName: string): string {
  return `${productId}-${size}-${colorName}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (product, size, color, quantity = 1) => {
        const itemId = generateCartItemId(product._id, size, color.name);
        const existingItem = get().items.find((item) => item.id === itemId);

        if (existingItem) {
          // Update quantity if item exists
          set({
            items: get().items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity,
            size,
            color,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...get().items, newItem] });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [], couponCode: null }),

      setCoupon: (code) => set({ couponCode: code }),

      setCartOpen: (isOpen) => set({ isOpen }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode }),
    }
  )
);

// Selectors
export const selectCartItems = (state: CartStore) => state.items;
export const selectCartItemCount = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
export const selectIsCartEmpty = (state: CartStore) => state.items.length === 0;
export const selectIsCartOpen = (state: CartStore) => state.isOpen;
export const selectCouponCode = (state: CartStore) => state.couponCode;
