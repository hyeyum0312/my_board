import { getBoardHandlers, getBoardIdHandlers } from './getHandler';
import { postHandlers } from './postHandlers';
import { putBoardHandlers } from './putHandlers';

export const boardHandlers = [
  ...getBoardHandlers,
  ...postHandlers,
  ...putBoardHandlers,
  ...getBoardIdHandlers,
];
