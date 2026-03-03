/**
 * UrbanCart Mock Data Module
 * Centralized exports for all mock data
 */

// Products
export {
  mockProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getBestsellers,
  getProductsByCategory,
  getProductsByCollection,
  searchProducts,
  getRelatedProducts,
  categories,
  collections,
  colors,
  sizes,
} from './products.mock';

// Collections
export {
  mockCollections,
  getCollectionBySlug,
  getCollectionById,
  getFeaturedCollections,
} from './collections.mock';

// Home
export {
  heroSlides,
  featuredSections,
  announcements,
  categories as homeCategories,
  brandFeatures,
  brandStory,
} from './home.mock';
export type {
  HeroSlide,
  HomeFeaturedSection,
  Announcement,
  Category as HomeCategory,
} from './home.mock';

// Cart
export {
  initialCartItems,
  availableCoupons,
  calculateCartTotals,
  savedAddresses,
  paymentMethods,
} from './cart.mock';
export type {
  CartItem,
  CartState,
  ShippingAddress,
  PaymentMethod,
} from './cart.mock';

// Account
export {
  mockUser,
  mockOrders,
  mockWishlist,
  getOrderById,
  getRecentOrders,
} from './account.mock';
export type {
  User,
  Order,
  OrderItem,
  WishlistItem,
} from './account.mock';

// Search
export {
  trendingSearches,
  recentSearches,
  popularCategories,
  popularCollections,
  defaultFilters,
  priceRanges,
  sortOptions,
  filterColors,
  filterSizes,
} from './search.mock';
export type {
  SearchSuggestion,
  SearchFilters,
} from './search.mock';

// Utility: Simulate API delay
export async function simulateDelay(ms: number = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: Simulate random API error (for testing)
export function simulateError(probability: number = 0.05): void {
  if (Math.random() < probability) {
    throw new Error('Simulated API error');
  }
}
