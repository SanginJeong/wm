import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: { email: string } | null;
  setAuth: (token: string, user: { email: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      user: null,
      setAuth: (token, user) => set({ accessToken: token, isLoggedIn: true, user }),
      clearAuth: () => set({ accessToken: null, isLoggedIn: false, user: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
    }
  )
);
