/**
 * UI Store
 * UI preferences and state management with Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type ViewMode = 'grid' | 'list';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  viewMode: ViewMode;
  productsPerPage: number;
  showFilters: boolean;
}

interface UIActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setViewMode: (mode: ViewMode) => void;
  setProductsPerPage: (count: number) => void;
  setShowFilters: (show: boolean) => void;
  toggleFilters: () => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  viewMode: 'grid',
  productsPerPage: 12,
  showFilters: true,
};

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

      toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),

      setSearchOpen: (searchOpen) => set({ searchOpen }),

      toggleSearch: () => set({ searchOpen: !get().searchOpen }),

      setViewMode: (viewMode) => set({ viewMode }),

      setProductsPerPage: (productsPerPage) => set({ productsPerPage }),

      setShowFilters: (showFilters) => set({ showFilters }),

      toggleFilters: () => set({ showFilters: !get().showFilters }),
    }),
    {
      name: 'ui-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        viewMode: state.viewMode,
        productsPerPage: state.productsPerPage,
        showFilters: state.showFilters,
      }),
    }
  )
);

// Selectors
export const selectTheme = (state: UIStore) => state.theme;
export const selectSidebarOpen = (state: UIStore) => state.sidebarOpen;
export const selectMobileMenuOpen = (state: UIStore) => state.mobileMenuOpen;
export const selectSearchOpen = (state: UIStore) => state.searchOpen;
export const selectViewMode = (state: UIStore) => state.viewMode;
export const selectProductsPerPage = (state: UIStore) => state.productsPerPage;
export const selectShowFilters = (state: UIStore) => state.showFilters;
