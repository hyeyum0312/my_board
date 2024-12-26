import { config } from 'dotenv';

// .env 파일을 로드합니다.
config();

export const ServerEnv = {
  backendUrl: process.env.BACKEND_URL ?? 'http://localhost', // 환경 변수에서 BACKEND_URL 값을 가져옵니다.
  mocking: process.env.MOCKING === 'true', // MOCKING 값을 boolean으로 변환
};
