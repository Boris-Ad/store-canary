import { create } from 'zustand';

type State = {
  newItems: string[];
};

type Action = {
  setNewItems: (items: State['newItems']) => void;
};

export const useNewItems = create<State & Action>(set => ({
  newItems: [],
  setNewItems: items => set(() => ({ newItems: items })),
}));
