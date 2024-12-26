'use client';

import DefaultLayout from './layout/DefaultLayout';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로를 가져오기 위해 사용

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const pathname = usePathname(); // 현재 경로 가져오기

  // 로그인, 로그아웃, 에러, 404 페이지, 로그인 관련 페이지에서는 헤더와 푸터를 제외하고 기본 레이아웃을 다르게 적용
  const isSpecialPage = [
    '/login',
    '/logout',
    '/error',
    '/not-found',
    '/auth/login',
  ].some((page) => pathname?.includes(page));

  return (
    <html suppressHydrationWarning lang="en">
      <body>
        {isSpecialPage ? (
          // 로그인, 로그아웃, 에러, 404 페이지에서는 Header와 Footer 없이 children만 렌더링
          <div>{children}</div>
        ) : (
          // 그 외 페이지에서는 DefaultLayout을 사용
          <DefaultLayout>{children}</DefaultLayout>
        )}
      </body>
    </html>
  );
}
