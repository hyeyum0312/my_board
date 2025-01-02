'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useBoardId, useUpdateBoard } from '@/lib/api/hooks/useBoard';
import { Board } from '@/lib/mocks/board/types';
import { BoardForm } from '@/components/ui/organisms/boardForm';

export default function BoardDetailPage() {
  const { id } = useParams(); // URL의 id 가져오기
  const boardId = Number(id); // id를 숫자로 변환
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Board>>({
    title: '',
    author: '',
    date: '',
  });

  // 게시글 상세 데이터 조회 훅
  const { data, isLoading, isError, error } = useBoardId(boardId);

  // 게시글 업데이트 훅
  const { mutate: updateBoard } = useUpdateBoard();

  const handleInputChange = (field: keyof Board, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateBoard = () => {
    if (!formData.title || !formData.author || !formData.date) {
      alert('All fields are required.');
      return;
    }

    updateBoard(
      { id: boardId, updatedData: formData },
      {
        onSuccess: () => {
          alert('Board updated successfully!');
          router.push('/board');
        },
        onError: (error: any) => {
          alert(error.message || 'Failed to update board.');
        },
      },
    );
  };

  // 게시글 데이터 로드 시 상태 업데이트
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        author: data.author,
        date: data.date,
      });
    }
  }, [data]);

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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Board Details</h1>
      <BoardForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleUpdateBoard}
        isSubmitting={true}
      />
    </div>
  );
}
