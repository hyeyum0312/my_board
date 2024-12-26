import { faker } from '@faker-js/faker';
import { log } from 'console';
import { setupServer } from 'msw/node';
import { handlers } from './handlers'; // 서버 핸들러들

const server = setupServer(...handlers);

export default function initMocks() {
  log('🚧 MSW와 함께 실행됩니다.');
  faker.seed(100);

  // 개발 환경에서만 MSW 서버가 요청을 수신하도록 설정
  if (process.env.NODE_ENV === 'development') {
    server.listen({
      onUnhandledRequest: 'bypass', // 핸들러에 없는 요청은 무시
    });
  }
}
