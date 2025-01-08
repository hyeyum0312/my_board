import { API_BASE_URL } from '@/constants/api';
import { useAuthStore } from '@/stores/authStore';

type HttpClientOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

type HttpClientResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

const httpClient = async <T>(
  url: string,
  options: HttpClientOptions = {},
): Promise<HttpClientResponse<T>> => {
  const { accessToken } = useAuthStore.getState();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: false, error: errorData.message || 'Something went wrong' };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: (error as Error).message || 'Network error' };
  }
};

export default httpClient;
