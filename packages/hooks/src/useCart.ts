import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  maxQuantity?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

type CartStore = CartState & CartActions;

const generateId = () => `cart_${Date.now()}_${Math.random().toString(36).substring(7)}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        );

        if (existingIndex > -1) {
          // Update quantity if item already exists
          const updatedItems = [...items];
          const existingItem = updatedItems[existingIndex];
          const newQuantity = existingItem.quantity + item.quantity;
          
          // Check max quantity limit
          if (item.maxQuantity && newQuantity > item.maxQuantity) {
            updatedItems[existingIndex] = {
              ...existingItem,
              quantity: item.maxQuantity,
            };
          } else {
            updatedItems[existingIndex] = {
              ...existingItem,
              quantity: newQuantity,
            };
          }
          
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ 
            items: [...items, { ...item, id: generateId() }],
          });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.maxQuantity
                    ? Math.min(quantity, item.maxQuantity)
                    : quantity,
                }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: 'apostle-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Selectors
export const useCart = () => useCartStore((state) => state.items);
export const useCartItemCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }));
export const useCartDrawer = () =>
  useCartStore((state) => ({
    isOpen: state.isOpen,
    openCart: state.openCart,
    closeCart: state.closeCart,
    toggleCart: state.toggleCart,
  }));
