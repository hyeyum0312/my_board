'use client';
import { ReactNode, useEffect } from 'react';

interface PropType {
  children: ReactNode;
}

async function startClientMSW() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const worker = await import('../browser').then((res) => res.default);
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

// 로깅 또는 추적을 설정
export default function IntegrateMSW({ children }: PropType) {
  useEffect(() => {
    startClientMSW();
  }, []);

  return <>{children}</>;
}
