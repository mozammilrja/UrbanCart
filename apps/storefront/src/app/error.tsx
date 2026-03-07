'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Error Occurred
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Something Went Wrong
        </h1>
        <p className="text-[#666] text-lg mb-4 max-w-md mx-auto">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        
        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="text-sm font-medium text-red-800 mb-1">Error Details:</p>
            <p className="text-sm text-red-600 font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-8 py-4 bg-[#111] text-white rounded-full font-medium hover:bg-[#333] transition-all hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 border-2 border-[#111] text-[#111] rounded-full font-medium hover:bg-[#111] hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-[#999]">
          Need help?{' '}
          <Link href="/contact" className="text-[#111] underline hover:no-underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
