'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  viewedAt: string;
}

interface WorkspaceStore {
  // Recently viewed products
  recentlyViewed: RecentlyViewedProduct[];
  addRecentlyViewed: (product: Omit<RecentlyViewedProduct, 'viewedAt'>) => void;
  clearRecentlyViewed: () => void;

  // Wishlist
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;

  // Search history
  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;

  // Filters state
  activeFilters: Record<string, string[]>;
  setFilter: (key: string, values: string[]) => void;
  clearFilters: () => void;
}

const MAX_RECENTLY_VIEWED = 10;
const MAX_SEARCH_HISTORY = 10;

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      // Recently viewed
      recentlyViewed: [],
      addRecentlyViewed: (product) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
          return {
            recentlyViewed: [
              { ...product, viewedAt: new Date().toISOString() },
              ...filtered,
            ].slice(0, MAX_RECENTLY_VIEWED),
          };
        });
      },
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) => {
        set((state) => {
          if (state.wishlist.includes(productId)) {
            return state;
          }
          return { wishlist: [...state.wishlist, productId] };
        });
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }));
      },
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },
      toggleWishlist: (productId) => {
        const { isInWishlist, addToWishlist, removeFromWishlist } = get();
        if (isInWishlist(productId)) {
          removeFromWishlist(productId);
        } else {
          addToWishlist(productId);
        }
      },

      // Search history
      searchHistory: [],
      addSearchQuery: (query) => {
        if (!query.trim()) return;
        set((state) => ({
          searchHistory: [
            query,
            ...state.searchHistory.filter((q) => q !== query),
          ].slice(0, MAX_SEARCH_HISTORY),
        }));
      },
      clearSearchHistory: () => set({ searchHistory: [] }),

      // Filters
      activeFilters: {},
      setFilter: (key, values) => {
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [key]: values,
          },
        }));
      },
      clearFilters: () => set({ activeFilters: {} }),
    }),
    {
      name: 'workspace-storage',
    }
  )
);
