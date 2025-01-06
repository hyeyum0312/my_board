'use client';

import { PropsWithChildren } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import '@/lib/mocks/init'; // MSW 초기화 (init.ts에서 한 번만 실행)
import { useAuthSync } from '@/lib/api/hooks/useAuthSync';
import { Providers } from '@/providers/Providers';

export default function DefaultLayout({ children }: PropsWithChildren) {
  useAuthSync(); // 초기 인증 상태 동기화

  return (
    <Providers>
      <div className="default-layout">
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </div>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </Providers>
  );
}
