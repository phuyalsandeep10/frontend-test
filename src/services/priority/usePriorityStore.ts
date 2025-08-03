import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Priority } from './priority';

interface PriorityState {
  priorities: Priority[];
  loading: boolean;
  error: string | null;
  setPriorities: (priorities: Priority[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePriorityStore = create(
  immer<PriorityState>((set) => ({
    priorities: [],
    loading: false,
    error: null,
    setPriorities: (priorities) =>
      set((state) => {
        state.priorities = priorities;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);
