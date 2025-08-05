import { User } from '@/hooks/auth/useAuthenticatedUser';
import { create } from 'zustand';

interface AuthState {
  authData: any;
  setAuthData: (data: User) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authData: null,
  setAuthData: (data) => set({ authData: data }),
  clearAuthData: () => set({ authData: null }),
}));
