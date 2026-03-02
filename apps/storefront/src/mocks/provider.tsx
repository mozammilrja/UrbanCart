'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function enableMocking() {
      // Only enable MSW in development
      if (process.env.NODE_ENV !== 'development') {
        setIsReady(true);
        return;
      }

      // Dynamically import the MSW worker
      const { worker } = await import('./browser');

      // Start the worker
      await worker.start({
        onUnhandledRequest: 'bypass', // Let non-mocked requests pass through
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });

      setIsReady(true);
    }

    enableMocking();
  }, []);

  // Show nothing until MSW is ready
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
