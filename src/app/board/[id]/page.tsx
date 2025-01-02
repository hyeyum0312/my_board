'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchBoardById } from '@/lib/api/board';
import Input from '@/components/ui/atom/Input';
import Button from '@/components/ui/atom/Button';

interface Board {
  id: number;
  title: string;
  author: string;
  date: string;
}

export default function BoardDetailPage() {
  const { id } = useParams(); // URL의 id 가져오기
  const boardId = Number(id); // id를 숫자로 변환
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Board>>({
    title: '',
    author: '',
    date: '',
  });

  const {
    data: board,
    isLoading,
    isError,
    error,
  } = useQuery<Board>({
    queryKey: ['board', boardId],
    queryFn: () => fetchBoardById(boardId),
    enabled: !isNaN(boardId), // boardId가 유효한 숫자일 때만 요청 실행
  });

  const updateBoardMutation = useMutation({
    mutationFn: async (updatedBoard: Partial<Board>) => {
      const response = await fetch(`/api/board/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBoard),
      });

      if (!response.ok) {
        throw new Error('Failed to update board.');
      }
    },
    onSuccess: () => {
      alert('Board updated successfully!');
      router.push('/board');
    },
    onError: (error: any) => {
      alert(error.message || 'Failed to update board.');
    },
  });

  const handleInputChange = (field: keyof Board, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateBoard = () => {
    if (!formData.title || !formData.author || !formData.date) {
      alert('All fields are required.');
      return;
    }

    updateBoardMutation.mutate(formData);
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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Board Details</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title:</label>
        <Input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Author:</label>
        <Input
          type="text"
          value={formData.author || ''}
          onChange={(e) => handleInputChange('author', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Date:</label>
        <Input
          type="date"
          value={formData.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Button href="/board" color="outline">
          목록
        </Button>
        <Button type="button" onClick={handleUpdateBoard}>
          수정
        </Button>
      </div>
    </div>
  );
}
