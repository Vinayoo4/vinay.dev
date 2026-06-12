'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neural flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md p-8 glass-panel rounded-2xl border border-red-500/20">
        <h2 className="text-3xl font-bold text-white font-mono mb-4">System Error</h2>
        <p className="text-gray-400 font-mono text-sm mb-8">
          A critical error occurred within the SALTEDHASH platform.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 transition-all font-mono text-sm"
          >
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all font-mono text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
