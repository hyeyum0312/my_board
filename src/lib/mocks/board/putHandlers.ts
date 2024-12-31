import { http } from 'msw';
import { Board } from './type';
import { boards } from './data';

export const putBoardHandlers = [
  http.put('/api/board/:id', async (req, res, ctx) => {
    const { id } = req.params; // URL 경로에서 `id` 추출
    const boardIndex = boards.findIndex((board) => board.id === Number(id));

    if (boardIndex === -1) {
      // 게시글 없을 경우 404 상태 반환
      return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }

    // 클라이언트로부터 전달된 데이터로 게시글 정보 업데이트
    const updatedUser: Partial<Board> = await req.json(); // 요청 본문을 JSON으로 파싱
    boards[boardIndex] = { ...boards[boardIndex], ...updatedUser }; // 기존 데이터를 부분적으로 업데이트

    // 업데이트된 게시글 반환
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Board updated successfully',
        board: boards[boardIndex],
      }),
    );
  }),
];
