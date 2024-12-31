import { http, HttpResponse } from 'msw';
import { boards } from './data';

export const getBoardHandlers = [
  http.get('/api/boards', () => {
    return HttpResponse.json(boards);
  }),
];
