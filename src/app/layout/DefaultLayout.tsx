'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Props = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  const pathname = usePathname();

  const isSpecialPage = [
    '/login',
    '/logout',
    '/error',
    '/not-found',
    '/auth/login',
  ].some((page) => pathname?.includes(page));

  if (isSpecialPage) {
    return <main>{children}</main>;
  }

  // 기본 레이아웃 적용
  return (
    <div className="default-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
