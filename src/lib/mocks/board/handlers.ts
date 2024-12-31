import { getBoardHandlers } from './getHandler';
import { putBoardHandlers } from './putHandlers';

export const boardHandlers = [...getBoardHandlers, ...putBoardHandlers];
