'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname(); // 현재 경로를 가져옵니다.

  const isDetailPage = pathname?.includes('/board/');

  return (
    <nav>
      {isDetailPage ? (
        <>
          <button onClick={() => window.history.back()}>뒤로가기</button>
          <Link href={'/'} className="button-link">
            로그아웃
          </Link>
        </>
      ) : (
        <>
          <Link href="/board" className="button-link">
            게시판
          </Link>
          <Link href={'/'} className="button-link">
            로그아웃
          </Link>
        </>
      )}
    </nav>
  );
}
