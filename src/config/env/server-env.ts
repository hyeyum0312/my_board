import { assertValue } from '@/utils/assert-value';

export const ServerEnv = {
  backendUrl:
    process.env.MOCKING === 'true'
      ? '' // MOCKING일 경우 backendUrl을 빈 문자열로 설정
      : assertValue(process.env.BACKEND_URL, 'BACKEND_URL is not defined'),

  mocking: process.env.MOCKING === 'true',
};
