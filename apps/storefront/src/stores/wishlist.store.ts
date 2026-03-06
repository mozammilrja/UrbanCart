/**
 * Wishlist Store
 * Wishlist state management with Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistItem {
  productId: string;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistActions {
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

type WishlistStore = WishlistState & WishlistActions;

const initialState: WishlistState = {
  items: [],
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (productId) => {
        if (!get().items.some((item) => item.productId === productId)) {
          set({
            items: [
              ...get().items,
              { productId, addedAt: new Date().toISOString() },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      toggleItem: (productId) => {
        const exists = get().items.some((item) => item.productId === productId);
        if (exists) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) =>
        get().items.some((item) => item.productId === productId),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Selectors
export const selectWishlistItems = (state: WishlistStore) => state.items;
export const selectWishlistCount = (state: WishlistStore) => state.items.length;
export const selectIsInWishlist = (productId: string) => (state: WishlistStore) =>
  state.items.some((item) => item.productId === productId);
