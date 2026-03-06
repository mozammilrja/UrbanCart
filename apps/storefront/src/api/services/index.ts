/**
 * API Services Module
 * Export all domain services
 */

export { productsService, getProducts, getProductById, getProductBySlug, searchProducts, getFeaturedProducts, getNewArrivals } from './products.service';
export type { ProductFilters, ProductDetail } from './products.service';

export { collectionsService, getCollections, getCollectionById, getCollectionBySlug, getCollectionProducts } from './collections.service';
export type { CollectionWithProducts, CollectionFilters } from './collections.service';

export { cartService, getCart, addToCart, updateCartItem, removeFromCart, clearCart, applyCoupon, removeCoupon } from './cart.service';
export type { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest, CouponResponse } from './cart.service';

export { ordersService, getOrders, getOrderById, createOrder, cancelOrder, trackOrder } from './orders.service';
export type { Order, OrderItem, OrderStatus, PaymentStatus, Address, OrderTracking, TrackingEvent, CreateOrderRequest, OrderFilters } from './orders.service';
