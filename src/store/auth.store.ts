import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user.type';

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthAction = {
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAccessToken: (token) => set({ token, isAuthenticated: !!token }),
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      })
    }
  )
);
