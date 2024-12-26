'use client';

import DefaultLayout from './layout/DefaultLayout';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로를 가져오기 위해 사용
import '../styles/globals.scss';
type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const pathname = usePathname();

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
          <main>{children}</main>
        ) : (
          <DefaultLayout>{children}</DefaultLayout>
        )}
      </body>
    </html>
  );
}
