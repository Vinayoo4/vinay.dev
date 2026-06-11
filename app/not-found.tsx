import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neural flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md p-8 glass-panel rounded-2xl border border-neon-cyan/20">
        <h2 className="text-3xl font-bold text-white font-mono mb-4">404 - Not Found</h2>
        <p className="text-gray-400 font-mono text-sm mb-8">
          The requested module or resource could not be found within the SALTEDHASH platform.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all font-mono text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
