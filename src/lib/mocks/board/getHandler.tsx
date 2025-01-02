import { http, HttpResponse } from 'msw';
import { boards } from './data';

export const getBoardHandlers = [
  // 모든 보드 데이터를 반환하는 핸들러
  http.get('/api/boards', () => {
    return HttpResponse.json(boards);
  }),
];

export const getBoardIdHandlers = [
  // 특정 ID의 보드 데이터를 반환하는 핸들러
  http.get('/api/boards/:id', ({ params }) => {
    const boardId = Number(params.id); // URL에서 id 가져오기
    const board = boards.find((b) => b.id === boardId); // 해당 ID의 데이터 검색

    if (!board) {
      // 데이터가 없으면 404 응답
      return HttpResponse.json(
        { message: `Board with ID ${boardId} not found.` },
        { status: 404 },
      );
    }

    // 해당 ID의 데이터를 반환
    return HttpResponse.json(board);
  }),
];
