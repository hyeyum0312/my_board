import { LoginResponse } from '../mocks/login/type';

export async function loginUser(data: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.username, password: data.password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to log in');
  }

  return response.json();
}
