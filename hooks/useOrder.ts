import { create } from 'zustand';

type State = {
address : string | null
}

type Action = {
setAddress:(address:State['address']) => void
}

export const useOrder = create<State & Action>(set => ({
address: null,
setAddress:(address) => set({address})
}))
