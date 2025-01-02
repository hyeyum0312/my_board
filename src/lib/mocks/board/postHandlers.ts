import { http, HttpResponse } from 'msw';
import { BoardTableRow } from '@/lib/mocks/board/type';
import { boards } from './data';

// 기본값 정의
const DEFAULT_TITLE = 'Untitled';
const DEFAULT_AUTHOR = 'Anonymous';
const getDefaultDate = () => new Date().toISOString(); // ISO 형식 날짜

// 에러 메시지 상수
const ERROR_MESSAGES = {
  INVALID_DATA: 'Invalid data: title and author are required.',
  SERVER_ERROR: 'Internal server error.',
};

export const handlers = [
  http.post('/api/board', async ({ request }) => {
    try {
      // 요청 데이터 파싱
      const newBoard: Partial<BoardTableRow> = await request.json();

      // 필수 필드 검증
      if (!newBoard.title || !newBoard.author) {
        return HttpResponse.json(
          { message: ERROR_MESSAGES.INVALID_DATA },
          { status: 400 },
        );
      }

      // 새로운 ID 생성
      const newId =
        boards.length > 0 ? Math.max(...boards.map((b) => b.id)) + 1 : 1;

      // 새 게시글 생성
      const createdBoard: BoardTableRow = {
        id: newId,
        title: newBoard.title || DEFAULT_TITLE,
        author: newBoard.author || DEFAULT_AUTHOR,
        date: newBoard.date || getDefaultDate(),
      };

      // 기존 배열에 추가
      boards.push(createdBoard);

      // 성공 응답 반환
      return HttpResponse.json(
        {
          message: 'Board created successfully',
          board: createdBoard,
        },
        { status: 201 },
      );
    } catch (error) {
      // 서버 오류 처리
      console.error('Error processing POST /api/board:', error);
      return HttpResponse.json(
        { message: ERROR_MESSAGES.SERVER_ERROR },
        { status: 500 },
      );
    }
  }),
];
