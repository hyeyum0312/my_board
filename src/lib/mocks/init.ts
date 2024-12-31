if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('./browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 실제 네트워크로 전달
    });
    console.log('MSW is running');
  });
}
