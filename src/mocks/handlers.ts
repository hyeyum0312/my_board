import { rest } from 'msw';
// src/mocks/handlers.ts

import { Row } from '@/types'; // Row 타입을 별도의 타입 파일로 관리한다고 가정

export const handlers = [
  // '/api/board'에 대한 GET 요청을 처리하고, 더미 데이터를 반환
  rest.get('/api/board', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Row[]>([
        { id: 1, title: '게시물 1', author: '홍길동', date: '2024-12-25' },
        { id: 2, title: '게시물 2', author: '김철수', date: '2024-12-24' },
        { id: 3, title: '게시물 3', author: '박영희', date: '2024-12-23' },
      ]),
    );
  }),
];
