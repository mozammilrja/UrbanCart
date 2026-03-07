'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#111] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Critical Error Icon */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-2xl rotate-12 animate-pulse">
              <AlertOctagon className="w-20 h-20 text-white -rotate-12" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Critical Error
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            A critical application error occurred. We're sorry for the inconvenience.
          </p>

          {/* Action */}
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#111] rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-2xl"
          >
            <RefreshCw className="w-6 h-6" />
            Reload Application
          </button>

          {/* Error Info */}
          {process.env.NODE_ENV === 'development' && error?.message && (
            <div className="mt-8 p-4 bg-white/10 border border-white/20 rounded-xl text-left">
              <p className="text-xs font-medium text-white/60 mb-1">Debug Info:</p>
              <p className="text-sm text-white/80 font-mono break-all">{error.message}</p>
            </div>
          )}

          {/* Brand */}
          <p className="mt-12 text-white/30 text-sm tracking-wider">APOSTLE</p>
        </div>
      </body>
    </html>
  );
}
