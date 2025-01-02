'use client';

import BoardTable from '@/components/ui/organisms/table/Table';
import { fetchBoards } from '@/lib/api/board';
import { boardColumns } from '@/lib/mocks/board/data';
import { Board } from '@/lib/mocks/board/type';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router에서 사용
import Button from '@/components/ui/atom/Button';

export default function BoardPage() {
  const router = useRouter();

  const {
    data: boards = [],
    isLoading,
    isError,
    error,
  } = useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  const [sortKey, setSortKey] = useState<keyof Board>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = React.useMemo(() => {
    if (!boards) return [];
    return [...boards].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [boards, sortKey, sortOrder]);

  const handleSortChange = (key: keyof Board, order: 'asc' | 'desc') => {
    setSortKey(key);
    setSortOrder(order);
  };

  const handleRowClick = (id: number) => {
    console.log(`Row clicked: ${id}`);
    // 추가 동작 구현 가능 (예: 상세 페이지로 이동)
    router.push(`/board/${id}`); // URL로 이동
  };

  const handleCreateClick = () => {
    router.push('/board/create');
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <BoardTable
        columns={boardColumns}
        rows={sortedData}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onRowClick={handleRowClick}
      />
      <Button type="button" onClick={handleCreateClick}>
        생성
      </Button>
    </div>
  );
}
