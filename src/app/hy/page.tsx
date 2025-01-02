'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchBoards } from '@/lib/api/board';
import { fetchUsers } from '@/lib/api/users';
import { User } from '@/lib/mocks/user/types';
import { Board } from '@/lib/mocks/board/types';

function DataLoader({ isLoading, isError, error, children }: any) {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  return children;
}

function UsersList({ users }: { users: User[] | undefined }) {
  if (!users || users.length === 0) return <div>No users found.</div>;

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}

function BoardsList({ boards }: { boards: Board[] | undefined }) {
  if (!boards || boards.length === 0) return <div>No boards found.</div>;

  return (
    <div>
      <h2>Boards</h2>
      {boards.map((board) => (
        <div key={board.id}>
          <p>{board.title}</p>
        </div>
      ))}
    </div>
  );
}

export default function Hy() {
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    data: boards,
    isLoading: isBoardsLoading,
    isError: isBoardsError,
    error: boardsError,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  return (
    <div>
      <DataLoader
        isLoading={isUsersLoading}
        isError={isUsersError}
        error={usersError}
      >
        <UsersList users={users} />
      </DataLoader>

      <DataLoader
        isLoading={isBoardsLoading}
        isError={isBoardsError}
        error={boardsError}
      >
        <BoardsList boards={boards} />
      </DataLoader>
    </div>
  );
}
