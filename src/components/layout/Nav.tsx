'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/atom/Button';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 네비게이션을 숨길 페이지 목록
  const hideNavPages = [
    '/login',
    '/signup',
    '/reset-password',
    '/password-expiration',
  ];

  // pathname이 hideNavPages 배열에 포함되면 네비게이션을 렌더링하지 않음
  if (hideNavPages.includes(pathname)) {
    return null;
  }

  // 링크의 클래스 이름을 조건에 따라 결정하는 함수
  const getLinkClassName = (link: string) =>
    pathname.startsWith(link)
      ? 'text-blue-500 font-semibold'
      : 'hover:text-blue-400 transition duration-300';

  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-3">
        {/* 왼쪽: 로고 */}
        <div className="text-lg font-bold flex space-x-6">
          <Link href="/">MyBrand</Link>

          <div className="hidden sm:flex items-center space-x-6">
            {/* 게시판 링크 */}
            <Link href="/board" className={getLinkClassName('/board')}>
              게시판
            </Link>
          </div>
        </div>

        {/* 데스크탑용 네비게이션 메뉴 */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link href="/login">
            <Button color="primary" size="large">
              로그인
            </Button>
          </Link>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <div className="sm:hidden">
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // 메뉴 열기/닫기
          >
            &#9776; {/* 햄버거 아이콘 */}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col space-y-4 px-4 py-2 bg-gray-100">
          <Link href="/board" className={getLinkClassName('/board')}>
            게시판
          </Link>
          <Link href="/login" className="text-blue-500">
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
}
