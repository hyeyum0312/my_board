if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('./browser')
    .then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 실제 네트워크로 전달
      });
    })
    .catch((err) => {
      console.error('MSW 초기화 중 에러 발생:', err);
    });
}

export {};
