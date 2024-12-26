'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const isDetailPage = pathname?.includes('/board/');

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">MyBrand</Link>
        </div>

        {/* Navigation Links */}
        {isDetailPage ? (
          <div className="flex space-x-4">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              뒤로가기
            </button>
            <Link href="/login">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                로그아웃
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-6">
            <Link
              href="/board"
              className="hover:text-blue-400 transition duration-300"
            >
              게시판
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
            >
              로그아웃
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
