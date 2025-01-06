'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/lib/mocks/init'; // MSW 초기화 (init.ts에서 한 번만 실행)
import { syncAuthState } from '@/lib/api/refresh';

export default function DefaultLayout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  useEffect(() => {
    const syncState = async () => {
      try {
        await syncAuthState(); // 로그인 상태 동기화
      } catch (error) {
        console.error('Error syncing auth state:', error);
      }
    };
    syncState();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="default-layout">
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </div>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
