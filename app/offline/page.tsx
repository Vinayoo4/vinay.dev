"use client";

import { WifiOff, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-neural flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8 glass-panel rounded-2xl border border-neon-cyan/20"
      >
        <WifiOff className="w-16 h-16 text-gray-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-3xl font-bold text-white font-mono mb-4">Offline Mode Active</h1>
        <p className="text-gray-400 font-mono text-sm mb-8">
          You are currently disconnected from the network. The SALTEDHASH umbrella shell is running locally. Reconnect to access live modules and data.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all font-mono text-sm"
        >
          <Home className="w-4 h-4" /> Return to Cached Home
        </Link>
      </motion.div>
    </div>
  );
}
