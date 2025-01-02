import { http, HttpResponse } from 'msw';
import { boards } from './data';
import { Board } from './types';

export const putBoardHandlers = [
  http.put('/api/board/:id', async ({ request, params }) => {
    try {
      // 요청 데이터 파싱
      const updateBoard: Partial<Board> = await request.json();
      const boardId = Number(params.id);

      // 데이터 검증
      if (!boardId || isNaN(boardId)) {
        return HttpResponse.json(
          { message: 'Invalid board ID.' },
          { status: 400 },
        );
      }

      const existingBoardIndex = boards.findIndex((b) => b.id === boardId);

      // ID에 해당하는 데이터가 없을 경우
      if (existingBoardIndex === -1) {
        return HttpResponse.json(
          { message: `Board with ID ${boardId} not found.` },
          { status: 404 },
        );
      }

      // 데이터 업데이트
      const updatedBoard = {
        ...boards[existingBoardIndex],
        ...updateBoard, // 업데이트된 필드만 적용
      };

      boards[existingBoardIndex] = updatedBoard;

      // 성공 응답
      return HttpResponse.json(
        {
          message: 'Board updated successfully',
          board: updatedBoard,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error('Error in PUT /api/board/:id handler:', error);
      return HttpResponse.json(
        { message: 'Internal server error.' },
        { status: 500 },
      );
    }
  }),
];
