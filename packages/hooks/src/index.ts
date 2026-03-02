// Cart hooks
export {
  useCartStore,
  useCart,
  useCartItemCount,
  useCartTotal,
  useCartActions,
  useCartDrawer,
  type CartItem,
} from './useCart';

// Wishlist hooks
export {
  useWishlistStore,
  useWishlist,
  useWishlistCount,
  useWishlistActions,
  useIsInWishlist,
  type WishlistItem,
} from './useWishlist';

// Auth hooks
export {
  useAuthStore,
  useAuth,
  useUser,
  useIsAuthenticated,
  useAccessToken,
  useAuthActions,
  type User,
} from './useAuth';

// Common utility hooks
export {
  useDebounce,
  useLocalStorage,
  useToggle,
  useClickOutside,
  useMediaQuery,
  useBreakpoint,
  useScrollPosition,
  useScrollDirection,
  useCopyToClipboard,
} from './useCommon';
