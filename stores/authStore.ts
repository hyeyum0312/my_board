import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));
