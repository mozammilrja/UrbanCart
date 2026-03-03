/**
 * UrbanCart Services Module
 * Centralized API-ready service layer
 * 
 * Usage:
 * - Set NEXT_PUBLIC_DATA_MODE='MOCK' for mock data (default)
 * - Set NEXT_PUBLIC_DATA_MODE='API' for real backend (when available)
 * 
 * UI components should ONLY import from this module, never from mock directly.
 */

export { productService } from './product.service';
export { collectionService } from './collection.service';
export { cartService } from './cart.service';
export { checkoutService } from './checkout.service';
export { accountService } from './account.service';
export { searchService } from './search.service';

// Re-export types
export type { ProductFilters, PaginatedResponse } from './product.service';
export type { CheckoutData, OrderConfirmation } from './checkout.service';
export type { SearchResponse } from './search.service';
