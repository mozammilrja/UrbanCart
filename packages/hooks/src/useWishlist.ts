import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistActions {
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
}

type WishlistStore = WishlistState & WishlistActions;

const generateId = () => `wish_${Date.now()}_${Math.random().toString(36).substring(7)}`;

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.productId === item.productId);
        
        if (!exists) {
          set({
            items: [
              ...items,
              {
                ...item,
                id: generateId(),
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },

      toggleItem: (item) => {
        const { items, addItem, removeItem } = get();
        const exists = items.some((i) => i.productId === item.productId);
        
        if (exists) {
          removeItem(item.productId);
        } else {
          addItem(item);
        }
      },
    }),
    {
      name: 'urbancart-wishlist',
    }
  )
);

// Selectors
export const useWishlist = () => useWishlistStore((state) => state.items);
export const useWishlistCount = () => useWishlistStore((state) => state.items.length);
export const useWishlistActions = () =>
  useWishlistStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    clearWishlist: state.clearWishlist,
    toggleItem: state.toggleItem,
  }));
export const useIsInWishlist = (productId: string) =>
  useWishlistStore((state) => state.items.some((item) => item.productId === productId));
