import { useAuthStore } from '../../stores/authStore';

export async function refreshToken() {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    });

    if (response.ok) {
      const data = await response.json();
      useAuthStore.getState().setAccessToken(data.access_token); // 새 액세스 토큰 저장
      return true; // 성공
    } else {
      // 실패 시 로그아웃 처리
      useAuthStore.getState().setLoggedIn(false);
      useAuthStore.getState().setAccessToken(null);
      console.warn('Failed to refresh token, logging out...');
      return false;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    // 네트워크 오류 등 예외 상황에서도 로그아웃 처리
    useAuthStore.getState().setLoggedIn(false);
    useAuthStore.getState().setAccessToken(null);
    return false;
  }
}
