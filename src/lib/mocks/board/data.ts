import { BoardTableColumn, BoardTableRow } from './types';

export const boards: BoardTableRow[] = [
  { id: 1, title: '게시물 1', author: '홍길동', date: '2024-12-25' },
  { id: 2, title: '게시물 2', author: '김철수', date: '2024-12-24' },
  { id: 3, title: '게시물 3', author: '박영희', date: '2024-12-23' },
];

export const boardColumns: BoardTableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: '제목' },
  { key: 'author', label: '작성자' },
  { key: 'date', label: '작성일' },
];
