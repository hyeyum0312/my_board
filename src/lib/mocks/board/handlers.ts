import { http, HttpResponse } from 'msw';

export const boardHandlers = [
  http.get('/api/boards', () => {
    return HttpResponse.json([
      { id: 1, title: 'Board 1', description: 'Description for Board 1' },
      { id: 2, title: 'Board 2', description: 'Description for Board 2' },
    ]);
  }),
];
