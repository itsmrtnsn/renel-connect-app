import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Items } from '../(store)/pos/get-items';

// Types

export interface CartItem {
  product: Items;
  quantity: number;
  discount: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Items) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// Create store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            if (existingItem.quantity + 1 > product.quantityInStock) {
              console.warn(
                `Cannot add more than available stock for ${product.name}`
              );
              return state;
            }
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1, discount: 0 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? {
                    ...item,
                    quantity: Math.max(
                      0,
                      Math.min(quantity, item.product.quantityInStock)
                    ),
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      updateDiscount: (productId, discount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  discount: Math.max(
                    0,
                    Math.min(discount, item.product.selling_Price)
                  ),
                }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) =>
            total +
            (item.product.selling_Price - item.discount) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage:
        typeof window !== 'undefined'
          ? {
              getItem: (key: string) => {
                const value = window.localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
              },
              setItem: (key: string, value: unknown) => {
                window.localStorage.setItem(key, JSON.stringify(value));
              },
              removeItem: (key: string) => {
                window.localStorage.removeItem(key);
              },
            }
          : undefined,
    }
  )
);

// Example usage component
