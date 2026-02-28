'use client';

import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface UIStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Sidebar
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarCollapsed: (isCollapsed: boolean) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;

  // Search
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;

  // Loading states
  isPageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Theme
  theme: 'system',
  setTheme: (theme) => set({ theme }),

  // Sidebar
  isSidebarOpen: true,
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),

  // Mobile menu
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Search
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),

  // Loading
  isPageLoading: false,
  setPageLoading: (isLoading) => set({ isPageLoading: isLoading }),
}));
