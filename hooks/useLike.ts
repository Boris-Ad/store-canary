import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  likedProducts: string[];
};

type Action = {
  setLikedProduct: (productId: string) => void;
  removeLikedProduct: (productId: string) => void;
  clearLikedProducts: () => void;
};

export const useLike = create<State & Action>()(
  persist(
    set => ({
      likedProducts: [],
      setLikedProduct: productId => set(state => ({ likedProducts: [...state.likedProducts, productId] })),
      removeLikedProduct: productId =>
        set(state => {
          const filteredProductId = state.likedProducts.filter(item => item !== productId);
          return { likedProducts: filteredProductId };
        }),
      clearLikedProducts: () => set({ likedProducts: [] }),
    }),
    {
      name: 'liked-products',
    }
  )
);
