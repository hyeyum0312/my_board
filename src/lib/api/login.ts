import { LoginResponse } from '@/app/(auth)/login/type';

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<{ ok: boolean; data?: LoginResponse; error?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      const responseData: LoginResponse = await response.json();
      return { ok: true, data: responseData };
    } else {
      const errorData = await response.json();
      return { ok: false, error: errorData.message || 'Failed to log in' };
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during login.',
    };
  }
}
