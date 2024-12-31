import { http, HttpResponse } from 'msw';

export const userHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe~', age: 25 },
      { id: 2, name: 'Jane Smith~', age: 30 },
      { id: 3, name: 'Sam Wilson~', age: 22 },
    ]);
  }),
];
