'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useBoardId,
  useCreateBoard,
  useUpdateBoard,
} from '@/lib/api/hooks/useBoard';
import { Board } from '@/lib/mocks/board/types';
import { BoardForm } from '@/components/ui/organisms/boardForm';

export default function BoardDetailPage() {
  const { id } = useParams();
  const boardId = Number(id);
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<Board, 'id'>>({
    title: '',
    author: '',
    date: '',
  });

  // 데이터 로드
  const { data: board, isLoading, isError, error } = useBoardId(boardId);

  // 데이터 생성
  const { mutate: createBoard } = useCreateBoard();

  const handleInputChange = (field: keyof Board, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateBoard = () => {
    if (!formData.title || !formData.author || !formData.date) {
      alert('All fields are required.');
      return;
    }

    createBoard(
      { createBoardData: formData },
      {
        onSuccess: () => {
          alert('Board updated successfully!');
          router.push('/board');
        },
        onError: (err) => {
          alert(err instanceof Error ? err.message : 'Update failed.');
        },
      },
    );
  };

  // board 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (board) {
      setFormData({
        title: board.title,
        author: board.author,
        date: board.date,
      });
    }
  }, [board]);

  if (isLoading) {
    return <div className="text-center">Loading board details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <BoardForm
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleUpdateBoard}
      isSubmitting={true}
    />
  );
}
