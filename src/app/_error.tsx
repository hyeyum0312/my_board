'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>오류가 발생했습니다!</h1>
      <p>{error.message}</p>
      <button onClick={() => window.history.back()}>뒤로가기</button>
    </div>
  );
}
