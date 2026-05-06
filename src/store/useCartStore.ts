import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// Helper to parse price string like "$185" to number
const parsePrice = (priceStr: string) => {
  return Number(priceStr.replace(/[^0-9.-]+/g, ""));
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCheckoutOpen: false,
      isCartOpen: false,
      
      openCheckout: () => set({ isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          };
        });
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'aurelia-cart-storage',
    }
  )
);
