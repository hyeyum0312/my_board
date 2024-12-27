import { rest } from 'msw';

import { boardDummyData } from '@/lib/mocks/data/data';

export const boardHandlers = [
  // Ensure the URL matches your API endpoint
  rest.get('http://localhost:3000/board', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(boardDummyData), // Return mock data
    );
  }),
];
