'use client';

import { fetchUsers } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

export default function Hy() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'], // 쿼리 키를 명확히 지정
    queryFn: fetchUsers, // API 호출 함수
  });

  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;

  // 에러 처리
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* 데이터를 렌더링 */}
      {data?.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}
