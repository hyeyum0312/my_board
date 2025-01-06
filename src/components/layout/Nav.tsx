'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/atom/Button';
import Link from 'next/link';
import { useAuthStore } from '../../../stores/authStore';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const hideNavPages = new Set([
    '/login',
    '/signup',
    '/reset-password',
    '/password-expiration',
    '/404',
  ]);

  if (hideNavPages.has(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      logout(); // 상태 초기화 및 로컬 스토리지 삭제
      router.push('/login');
    } else {
      console.error('Failed to log out');
    }
  };

  const getLinkClassName = (link: string) =>
    pathname.startsWith(link)
      ? 'text-blue-500 font-semibold'
      : 'hover:text-blue-400 transition duration-300';

  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold flex space-x-6">
          <Link href="/">MyBrand</Link>
          <div className="hidden sm:flex items-center space-x-6">
            <Link href="/board" className={getLinkClassName('/board')}>
              게시판
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-6">
          {isLoggedIn ? (
            <Button color="primary" size="large" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <Link href="/login">
              <Button color="primary" size="large">
                로그인
              </Button>
            </Link>
          )}
        </div>

        <div className="sm:hidden">
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            &#9776;
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="sm:hidden flex flex-col space-y-4 px-4 py-2 bg-gray-100"
          aria-expanded={isMenuOpen}
        >
          <Link
            href="/board"
            className={getLinkClassName('/board')}
            onClick={() => setIsMenuOpen(false)}
          >
            게시판
          </Link>
          {isLoggedIn ? (
            <Button
              color="primary"
              size="large"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Link
              href="/login"
              className="text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              로그인
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
