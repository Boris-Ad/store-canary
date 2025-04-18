import { ICartProduct } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  products: { [key: string]: ICartProduct };
};

type Action = {
  addProduct: (productId: string, product: ICartProduct) => void;
  removeProduct: (productId: string) => void;
  removeAllProducts: () => void;
};

export const useCart = create<State & Action>()(
  persist(
    set => ({
      products: {},
      addProduct: (id, value) => set(state => ({ products: { ...state.products, [id]: value } })),
      removeProduct: id =>
        set(state => {
          const newO = { ...state.products };
          delete newO[id];
          return { products: newO };
        }),
      removeAllProducts: () => set(() => ({ products: {} })),
    }),
    { name: 'cart-products' }
  )
);

