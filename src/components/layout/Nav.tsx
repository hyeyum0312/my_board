'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/atom/Button';

export default function Nav() {
  const pathname = usePathname();
  const isDetailPage = pathname?.includes('/board/');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 관리

  const getLinkClassName = (link: string) => {
    return pathname?.startsWith(link)
      ? 'text-blue-500 font-semibold' // 활성화된 링크에 대한 클래스
      : 'hover:text-blue-400 transition duration-300'; // 기본 링크 스타일
  };

  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-3">
        {/* 왼쪽: 로고 */}
        <div className="text-lg font-bold flex space-x-6">
          <Link href="/">MyBrand</Link>

          <div className="hidden sm:flex items-center space-x-6">
            {!isDetailPage && (
              <Link href="/board" className={getLinkClassName('/board')}>
                게시판
              </Link>
            )}
          </div>
        </div>

        {/* 데스크탑용 네비게이션 메뉴 (모바일에서는 숨김) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* 로그인 버튼 */}
          <div className="flex items-center space-x-6">
            <Link href="/login">
              <Button color="primary" size="large">
                로그아웃
              </Button>
            </Link>
          </div>
        </div>

        {/* 모바일 햄버거 버튼 (모바일에서만 보이도록 설정) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // 메뉴 열기/닫기 토글
            className="text-2xl focus:outline-none"
          >
            &#9776; {/* 햄버거 아이콘 */}
          </button>
        </div>

        {/* 모바일 메뉴 (햄버거 버튼 클릭 시 열리도록 설정) */}
        <div
          className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} // 메뉴 상태에 따라 표시
        >
          <div className="flex flex-col space-y-4 px-4 py-2 bg-gray-100">
            <Link href="/board" className={getLinkClassName('/board')}>
              게시판
            </Link>
            <Link href="/login" className="text-blue-500">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
