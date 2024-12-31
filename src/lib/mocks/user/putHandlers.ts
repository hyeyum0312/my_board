import { http } from 'msw';
import { User } from './types';

const users: User[] = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  { id: 3, name: 'Sam Wilson', age: 22 },
];

export const putUserHandlers = [
  http.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params; // URL 경로에서 `id` 추출
    const userIndex = users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      // 사용자가 없을 경우 404 상태 반환
      return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }

    // 클라이언트로부터 전달된 데이터로 사용자 정보 업데이트
    const updatedUser: Partial<User> = await req.json(); // 요청 본문을 JSON으로 파싱
    users[userIndex] = { ...users[userIndex], ...updatedUser }; // 기존 데이터를 부분적으로 업데이트

    // 업데이트된 사용자 반환
    return res(
      ctx.status(200),
      ctx.json({
        message: 'User updated successfully',
        user: users[userIndex],
      }),
    );
  }),
];
