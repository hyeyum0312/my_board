import { ServerEnv } from './constants/server-env';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && ServerEnv.mocking) {
    const { initMocks } = await import('./lib/msw/server');
    initMocks();
  }
}
