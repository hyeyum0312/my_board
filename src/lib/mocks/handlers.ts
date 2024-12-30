import { boardHandlers } from './board/handlers';
import { getUserHandlers } from './user/getHandlers';

export const handlers = [...boardHandlers, ...getUserHandlers];
