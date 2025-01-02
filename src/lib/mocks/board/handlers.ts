import { getBoardHandlers, getBoardIdHandlers } from './getHandler';
import { putBoardHandlers } from './putHandlers';

export const boardHandlers = [
  ...getBoardHandlers,
  ...putBoardHandlers,
  ...getBoardIdHandlers,
];
