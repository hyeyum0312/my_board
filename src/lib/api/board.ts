import { Board } from '../mocks/board/type';

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch('/api/boards', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }

  return response.json();
};

export const createBoard = async (
  newBoard: Omit<Board, 'id'>, // ID를 제외한 데이터를 받음
): Promise<Board> => {
  const response = await fetch('/api/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBoard),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create board');
  }

  return response.json();
};
