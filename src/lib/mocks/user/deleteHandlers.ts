import { http, HttpResponse } from 'msw';
import { User } from './types';

const users: User[] = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  { id: 3, name: 'Sam Wilson', age: 22 },
];

export const deleteUserHandlers = [
  http.delete('/api/users/:id', (req) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users.splice(userIndex, 1);
    return HttpResponse.json({ message: 'User deleted successfully' });
  }),
];
