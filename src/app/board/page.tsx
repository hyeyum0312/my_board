'use client';

import BoardTable from '@/components/ui/organisms/table/Table';
import { boardColumns } from '@/lib/mocks/board/data';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/atom/Button';
import { useBoards } from '@/lib/api/hooks/useBoard';
import { Board } from '@/lib/mocks/board/types';
import { sortedData } from '@/lib/utils';

export default function BoardPage() {
  const router = useRouter();

  // 게시판 데이터 로드
  const { data: boards = [], isLoading, isError, error } = useBoards();

  const [sortKey, setSortKey] = useState<keyof Board>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortedData = React.useMemo(() => {
    return sortedData({ data: boards, sortKey, sortOrder });
  }, [boards, sortKey, sortOrder]);

  const handleSortChange = (key: keyof Board, order: 'asc' | 'desc') => {
    setSortKey(key);
    setSortOrder(order);
  };

  const handleRowClick = (id: number) => {
    console.log(`Row clicked: ${id}`);
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
        rows={handleSortedData}
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
