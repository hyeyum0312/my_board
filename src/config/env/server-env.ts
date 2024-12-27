import { assertValue } from '@/lib/utils';

export const ServerEnv = {
  backendUrl:
    process.env.MOCKING === 'true'
      ? 'http://example.com' // MOCKING일 경우에도 절대 URL을 설정
      : assertValue(process.env.BACKEND_URL, 'BACKEND_URL is not defined'),

  mocking: process.env.MOCKING === 'true',
};
