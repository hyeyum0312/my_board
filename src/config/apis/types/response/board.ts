// Row 타입을 명확히 정의
export type boardTableRow = {
  id: number; // 항상 존재하는 필드
  title: string;
  author: string;
  date: string;
};

// Column 타입 정의
export type boardTableColumn = {
  key: keyof boardTableRow; // Row의 키 중 하나만 가능
  label: string; // 컬럼의 표시 이름
};
