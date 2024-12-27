import { assertValue } from '@/utils/assert-value';

export const ServerEnv = {
  backendUrl: assertValue(
    process.env.BACKEND_URL,
    'BACKEND_URL is not defined',
  ),

  mocking: process.env.MOCKING === 'true',
};
