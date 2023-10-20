import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { FormattedProduct } from '@/types';

interface CartStore {
  items: FormattedProduct[];
  addItem: (data: FormattedProduct) => void;
  removeItem: (id: string) => void;
  removeAllItems: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: FormattedProduct) => {
        const currentItems = get().items;
        const existingItems = currentItems.filter(function (item) {
          return item.id === data.id;
        });

        if (existingItems.length > 9) {
          return toast.error('You cannot order more than 10 of each item.');
        }

        set({ items: [...get().items, data] });
        toast.success('Item added to cart.');
      },

      removeItem: (id: string) => {
        const currentItems = get().items;
        const findItem = currentItems.findLastIndex(function (item) {
          return item.id === id;
        });

        set({ items: [...get().items.toSpliced(findItem, 1)] });
        toast.success('Item removed from cart.');
      },

      removeAllItems: (id: string) => {
        set({
          items: [
            ...get().items.filter(function (item) {
              return item.id !== id;
            }),
          ],
        });
        toast.success('Item removed from cart.');
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
