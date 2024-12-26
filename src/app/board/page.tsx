'use client';

import BoardTable from '@/components/ui/organisms/table/Table';
import React, { useState } from 'react';

// Row 타입을 명확히 정의
type Row = {
  id: number; // 항상 존재하는 필드
  title: string;
  author: string;
  date: string;
};

// Column 타입 정의
type Column = {
  key: keyof Row; // Row의 키 중 하나만 가능
  label: string; // 컬럼의 표시 이름
};

// dummyData에 대한 타입 명시
const dummyData: Row[] = [
  { id: 1, title: '게시물 1', author: '홍길동', date: '2024-12-25' },
  { id: 2, title: '게시물 2', author: '김철수', date: '2024-12-24' },
  { id: 3, title: '게시물 3', author: '박영희', date: '2024-12-23' },
];

const columns: Column[] = [
  { key: 'id', label: 'ID' }, // 'id'는 Row의 키 중 하나입니다.
  { key: 'title', label: '제목' }, // 'title'도 마찬가지입니다.
  { key: 'author', label: '작성자' },
  { key: 'date', label: '작성일' },
];

export default function BoardPage() {
  const [data, setData] = useState(dummyData);
  const [sortKey, setSortKey] = useState<keyof (typeof dummyData)[0]>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (
    key: keyof (typeof dummyData)[0],
    order: 'asc' | 'desc',
  ) => {
    setSortKey(key);
    setSortOrder(order);
    setData(
      [...data].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
      }),
    );
  };

  const handleRowClick = (id: number) => {
    console.log(`Row clicked: ${id}`);
    // 추가 동작 구현 가능 (예: 상세 페이지로 이동)
  };

  return (
    <div className="container mx-auto py-6">
      <BoardTable
        columns={columns}
        rows={data}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
