import { useEffect } from 'react';
import { refreshToken } from '@/lib/api/refresh';
import { useAuthStore } from '../../../../stores/authStore';
import { usePathname } from 'next/navigation';

export function useAuthSync() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const syncAuthState = async () => {
      if (pathname === '/login') {
        console.log('Skipping refresh token check on /login page.');
        return;
      }

      if (!isLoggedIn) {
        console.log('User is not logged in. Refreshing token...');
        const success = await refreshToken();
        if (!success) {
          console.warn('Token refresh failed. Logging out...');
        }
      }
    };

    syncAuthState();
  }, [pathname, isLoggedIn]);
}
