if (typeof window !== 'undefined') {
  import('./browser').then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' });
    console.log('MSW is running');
  });
}
