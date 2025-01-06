import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,

      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setAccessToken: (access_token) => set({ accessToken: access_token }),

      logout: () => {
        set({ isLoggedIn: false, accessToken: null });
        localStorage.removeItem('auth-storage'); // 로컬 스토리지에서 데이터 제거
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지 키 이름
    },
  ),
);
