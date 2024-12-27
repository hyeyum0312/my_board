import { HttpHandler } from 'msw';
import { questionHandlers } from './question-handlers';
import { boardHandlers } from './boardHandlers';

const handlers: HttpHandler[] = [...questionHandlers, ...boardHandlers];

export { handlers };
