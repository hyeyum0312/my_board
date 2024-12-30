'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
    if (error.digest) {
      console.error('Digest:', error.digest); // 디버깅용 digest 출력
    }
  }, [error]);

  return (
    <div>
      <h1>오류가 발생했습니다!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
      <button onClick={() => window.history.back()}>뒤로가기</button>
    </div>
  );
}
