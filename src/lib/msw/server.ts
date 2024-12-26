import { faker } from '@faker-js/faker';
import { log } from 'console';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

export default function initMocks() {
  log('🚧 MSW와 함께 실행됩니다.');
  faker.seed(100);
  server.listen({
    onUnhandledRequest: 'bypass',
  });
}
