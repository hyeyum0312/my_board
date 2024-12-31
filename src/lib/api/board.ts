import { Board } from '../mocks/board/type';

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch('/api/boards');
  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }
  return response.json();
};
