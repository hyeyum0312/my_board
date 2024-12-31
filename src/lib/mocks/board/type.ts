// 기본 Board 타입
export type Board = {
  id: number;
  title: string;
  author: string;
  date: string;
};

// 테이블에서 사용할 BoardRow 타입 (기존 Board와 동일)
export type BoardTableRow = Board;

// 컬럼 타입 정의
export type BoardTableColumn = {
  key: keyof BoardTableRow;
  label: string;
};
