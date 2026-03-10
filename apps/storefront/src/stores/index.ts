/**
 * Stores Index
 * Export all Zustand stores
 */

// Cart Store
export { useCartStore, selectCartItems, selectCartItemCount, selectCartSubtotal, selectIsCartEmpty, selectIsCartOpen, selectCouponCode } from './cart.store';
export type { CartItem } from './cart.store';

// Modal Store
export { useModalStore, useModal, selectIsModalOpen, selectModalType, selectModalData } from './modal.store';

// UI Store
export { useUIStore, selectTheme, selectSidebarOpen, selectMobileMenuOpen, selectSearchOpen, selectViewMode, selectProductsPerPage, selectShowFilters } from './ui.store';

// Wishlist Store
export { useWishlistStore, selectWishlistItems, selectWishlistCount, selectIsInWishlist } from './wishlist.store';

// Filters Store
export { useFiltersStore, selectFilters, selectActiveFilterCount } from './filters.store';
