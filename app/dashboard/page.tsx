"use client";

import { motion } from "framer-motion";
import { Activity, Bell, Package } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white font-mono mb-2">Welcome Back, User</h1>
        <p className="text-gray-400 font-mono text-sm">Here is your centralized SALTEDHASH overview.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl glass-panel border border-neon-cyan/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-sm font-bold text-white font-mono">Active Modules</h3>
          </div>
          <p className="text-3xl font-bold text-white font-mono">3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl glass-panel border border-neon-purple/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-neon-purple" />
            <h3 className="text-sm font-bold text-white font-mono">Platform Status</h3>
          </div>
          <p className="text-lg font-bold text-neon-green font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" /> All Systems Nominal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl glass-panel border border-gray-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-bold text-white font-mono">Notifications</h3>
          </div>
          <p className="text-sm text-gray-500 font-mono">No new notifications.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white font-mono mb-6">Recent Activity</h2>
        <div className="p-8 rounded-xl glass-panel border border-gray-800 text-center text-gray-500 font-mono text-sm">
          No recent activity across your linked modules.
          <div className="mt-4">
            <Link href="/modules" className="text-neon-cyan hover:underline">Browse Modules →</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
