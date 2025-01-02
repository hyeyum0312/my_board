import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchBoardById,
  fetchBoards,
  updateBoard,
  createBoard,
} from '@/lib/api/board';
import { Board } from '@/lib/mocks/board/types';

// 게시판 목록 조회 훅
export const useBoards = () => {
  return useQuery<Board[], Error>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });
};

// 게시글 업데이트 훅
export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: number;
      updatedData: Partial<Board>;
    }) => updateBoard(id, updatedData),
  });
};

export const useBoardId = (boardId: number) => {
  return useQuery<Board>({
    queryKey: ['board', boardId],
    queryFn: () => fetchBoardById(boardId),
    enabled: !isNaN(boardId), // boardId가 유효한 숫자일 때만 요청 실행
  });
};

export const useCreateBoard = () => {
  return useMutation<
    Board, // 성공 시 반환 타입
    Error, // 에러 타입
    { createBoardData: Omit<Board, 'id'> } // 필수 데이터 타입
  >({
    mutationFn: ({ createBoardData }) => createBoard(createBoardData),
  });
};
