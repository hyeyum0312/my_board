import { http } from 'msw';
import { boardTableRow } from '@/lib/mocks/board/type';
import { boards } from './data';

// 기본값 정의
const DEFAULT_TITLE = 'Untitled';
const DEFAULT_AUTHOR = 'Anonymous';
const getDefaultDate = () => new Date().toISOString(); // ISO 형식 날짜

export const postBoardHandlers = [
  http.post('/api/board', async (req, res, ctx) => {
    try {
      // 요청 데이터 파싱
      const newBoard: Partial<boardTableRow> = await req.json();

      // 필수 필드 검증
      if (!newBoard.title || !newBoard.author) {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Invalid data: title and author are required.',
          }),
        );
      }

      // 새 게시글 ID 생성
      const newId =
        boards.length > 0 ? Math.max(...boards.map((b) => b.id)) + 1 : 1;

      // 새 게시글 생성
      const createdBoard: boardTableRow = {
        id: newId,
        title: newBoard.title || DEFAULT_TITLE,
        author: newBoard.author || DEFAULT_AUTHOR,
        date: newBoard.date || getDefaultDate(),
      };

      // 기존 배열에 추가
      boards.push(createdBoard);

      // 성공 응답 반환
      return res(
        ctx.status(201), // 201 Created
        ctx.json({
          message: 'Board created successfully',
          board: createdBoard,
        }),
      );
    } catch (error) {
      // 서버 오류 처리
      console.error('Error processing request:', error);
      return res(
        ctx.status(500),
        ctx.json({
          message: 'Internal server error.',
        }),
      );
    }
  }),
];
