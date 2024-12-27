import { rest } from 'msw';
import { boardDummyData } from '@/lib/mocks/data/data';

export const boardHandlers = [
  rest.get('/api/board', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(boardDummyData));
  }),
];
