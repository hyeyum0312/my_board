'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoard } from '@/lib/api/board';
import { Board } from '@/lib/mocks/board/type';

type CreateBoardForm = Omit<Board, 'id'>;

export default function CreateBoard() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');

  const mutation = useMutation<Board, Error, CreateBoardForm>(
    (newBoard) => createBoard(newBoard),
    {
      onSuccess: (data) => {
        console.log('Board created successfully:', data);
        alert('Board created successfully!');
        queryClient.invalidateQueries(['boards']); // 캐시 무효화
      },
      onError: (error) => {
        console.error('Failed to create board:', error);
        alert(error.message);
      },
    },
  );

  const handleSubmit = () => {
    if (!title || !author) {
      alert('Title and author are required!');
      return;
    }

    const newBoard: CreateBoardForm = {
      title,
      author,
      date: date || new Date().toISOString(),
    };

    mutation.mutate(newBoard);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Create Board</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Date (optional):
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        disabled={mutation.isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {mutation.isLoading ? 'Creating...' : 'Create Board'}
      </button>
    </div>
  );
}
