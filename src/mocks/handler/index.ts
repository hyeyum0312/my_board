import { HttpHandler } from 'msw';
import { questionHandlers } from './question-handlers';

const handlers: HttpHandler[] = [...questionHandlers];

export { handlers };
