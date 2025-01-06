import { useAuthStore } from '../../../stores/authStore';

export const syncAuthState = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // JSON 데이터를 바로 읽기
      const data = await response.json();
      console.log('data', data);

      useAuthStore.getState().setLoggedIn(true); // 로그인 상태 동기화
    } else {
      console.error('Failed response:', response.statusText);
      useAuthStore.getState().setLoggedIn(false); // 로그아웃 처리
    }
  } catch (error) {
    console.error('Failed to sync auth state:', error);
    useAuthStore.getState().setLoggedIn(false); // 네트워크 오류 시 로그아웃 처리
  }
};
