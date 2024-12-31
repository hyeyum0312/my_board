import { boardHandlers } from './board/handlers';
import { userHandlers } from './user/handlers';

export const handlers = [...userHandlers, ...boardHandlers];
