'use client';

import { PropsWithChildren } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DefaultLayout({ children }: PropsWithChildren) {
  // 기본 레이아웃 적용
  return (
    <div className="default-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
