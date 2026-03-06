/**
 * Cart Feature Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
} from '@/api/services/cart.service';
import type { AddToCartRequest, UpdateCartItemRequest } from '@/api/services/cart.service';

// Query keys
export const cartKeys = {
  all: ['cart'] as const,
  detail: () => [...cartKeys.all, 'detail'] as const,
};

/**
 * Hook to get cart data
 */
export function useCart() {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: getCart,
    staleTime: 0, // Always fetch fresh cart data
  });
}

/**
 * Hook to add item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartRequest) => addToCart(data),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.detail(), cart);
    },
  });
}

/**
 * Hook to update cart item
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCartItemRequest) => updateCartItem(data),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.detail(), cart);
    },
  });
}

/**
 * Hook to remove item from cart
 */
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => removeFromCart(itemId),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.detail(), cart);
    },
  });
}

/**
 * Hook to clear cart
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.detail(), cart);
    },
  });
}

/**
 * Hook to apply coupon
 */
export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCoupon(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}
