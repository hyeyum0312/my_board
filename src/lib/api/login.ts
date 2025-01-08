import httpClient from './httpClient';
import { LoginResponse, HttpClientResponse } from '@/app/(auth)/login/type';

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<HttpClientResponse<LoginResponse>> => {
  return httpClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: data,
  });
};
