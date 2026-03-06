/**
 * Filters Store
 * Shop filters state management
 */

import { create } from 'zustand';

interface FiltersState {
  categories: string[];
  collections: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sort: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'name_asc' | 'name_desc';
  search: string;
  page: number;
  limit: number;
}

interface FiltersActions {
  setCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  setCollections: (collections: string[]) => void;
  toggleCollection: (collection: string) => void;
  setSizes: (sizes: string[]) => void;
  toggleSize: (size: string) => void;
  setColors: (colors: string[]) => void;
  toggleColor: (color: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: FiltersState['sort']) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  clearFilters: () => void;
  clearAll: () => void;
}

type FiltersStore = FiltersState & FiltersActions;

const initialState: FiltersState = {
  categories: [],
  collections: [],
  sizes: [],
  colors: [],
  priceRange: [0, 50000],
  sort: 'newest',
  search: '',
  page: 1,
  limit: 12,
};

// Helper to toggle item in array
function toggleInArray(arr: string[], item: string): string[] {
  return arr.includes(item)
    ? arr.filter((i) => i !== item)
    : [...arr, item];
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  ...initialState,

  setCategories: (categories) => set({ categories, page: 1 }),
  toggleCategory: (category) =>
    set({ categories: toggleInArray(get().categories, category), page: 1 }),

  setCollections: (collections) => set({ collections, page: 1 }),
  toggleCollection: (collection) =>
    set({ collections: toggleInArray(get().collections, collection), page: 1 }),

  setSizes: (sizes) => set({ sizes, page: 1 }),
  toggleSize: (size) => set({ sizes: toggleInArray(get().sizes, size), page: 1 }),

  setColors: (colors) => set({ colors, page: 1 }),
  toggleColor: (color) => set({ colors: toggleInArray(get().colors, color), page: 1 }),

  setPriceRange: (priceRange) => set({ priceRange, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),

  clearFilters: () =>
    set({
      categories: [],
      collections: [],
      sizes: [],
      colors: [],
      priceRange: [0, 50000],
      page: 1,
    }),

  clearAll: () => set(initialState),
}));

// Selectors
export const selectFilters = (state: FiltersStore) => ({
  categories: state.categories,
  collections: state.collections,
  sizes: state.sizes,
  colors: state.colors,
  priceRange: state.priceRange,
  sort: state.sort,
  search: state.search,
  page: state.page,
  limit: state.limit,
});

export const selectActiveFilterCount = (state: FiltersStore) => {
  let count = 0;
  if (state.categories.length) count += state.categories.length;
  if (state.collections.length) count += state.collections.length;
  if (state.sizes.length) count += state.sizes.length;
  if (state.colors.length) count += state.colors.length;
  if (state.priceRange[0] > 0 || state.priceRange[1] < 50000) count += 1;
  return count;
};
