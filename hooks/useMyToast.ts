import { create } from 'zustand';

type State = {
  action: 'face' | 'auth' | null;
  text: string;
  variant: 'success' | 'warning' | 'error';
};

type Action = {
  setAction: (action: State['action'], text: State['text'], variant: State['variant']) => void;
};

let one: NodeJS.Timeout | null = null;

export const useMyToast = create<State & Action>(set => ({
  action: null,
  text: '',
  variant: 'success',
  setAction: (action, text, variant) =>
    set(state => {
      if (one) clearTimeout(one);
      one = setTimeout(() => state.setAction(null, '', 'success'), 3000);
      return { action, text, variant };
    }),
}));
