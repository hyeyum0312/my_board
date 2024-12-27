import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// MSW worker를 설정
const worker = setupWorker(...handlers);

// MOCKING이 true일 때만 worker를 시작
if (process.env.MOCKING === 'true') {
  worker.start();
}

export default worker;
