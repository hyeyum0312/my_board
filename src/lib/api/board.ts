import { Board } from '../mocks/board/types';

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch('/api/boards', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }

  return response.json();
};

export const fetchBoardById = async (id: number): Promise<Board> => {
  try {
    const response = await fetch(`/api/boards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Board with ID ${id} not found.`);
      }
      throw new Error(`Failed to fetch board with ID ${id}.`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
};

export const createBoard = async (
  newBoard: Omit<Board, 'id'>,
): Promise<Board> => {
  const response = await fetch('/api/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBoard),
  });

  const contentType = response.headers.get('Content-Type');
  if (!response.ok || !contentType?.includes('application/json')) {
    const errorData = contentType?.includes('application/json')
      ? await response.json()
      : { message: 'Unexpected response from server' };

    throw new Error(errorData.message || 'Failed to create board');
  }

  return response.json();
};

export const updateBoard = async (
  boardId: number,
  updatedBoard: Partial<Board>,
): Promise<void> => {
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
};
