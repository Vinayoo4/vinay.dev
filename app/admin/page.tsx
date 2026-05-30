"use client";

import { motion } from "framer-motion";
import { Activity, Users, Database, Server, RefreshCw } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-neural py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white font-mono mb-2">Platform Admin Panel</h1>
            <p className="text-gray-400 font-mono text-sm">Global control and status for the SALTEDHASH umbrella.</p>
          </motion.div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 transition-colors font-mono text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh Status
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Users", value: "1,204", icon: Users, color: "text-blue-400" },
            { label: "API Requests", value: "84.2k/h", icon: Activity, color: "text-neon-cyan" },
            { label: "Database Load", value: "24%", icon: Database, color: "text-neon-purple" },
            { label: "Server Status", value: "99.9% Uptime", icon: Server, color: "text-neon-green" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl glass-panel border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 font-mono">{stat.label}</h3>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl glass-panel border border-gray-800"
          >
            <h2 className="text-lg font-bold text-white font-mono mb-6">Service Health</h2>
            <div className="space-y-4">
              {[
                { name: "Umbrella PWA Core", status: "Operational", ping: "24ms" },
                { name: "Identity Auth Node", status: "Operational", ping: "45ms" },
                { name: "Module Registry API", status: "Operational", ping: "32ms" },
                { name: "Database Cluster", status: "Operational", ping: "18ms" },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                    <span className="text-sm text-gray-300 font-mono">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-neon-green">{service.status}</span>
                    <span className="text-gray-500">{service.ping}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl glass-panel border border-gray-800"
          >
            <h2 className="text-lg font-bold text-white font-mono mb-6">Recent System Logs</h2>
            <div className="space-y-3 font-mono text-xs">
              <div className="text-gray-400"><span className="text-neon-cyan">[INFO]</span> 10:24:12 - Umbrella shell initialized.</div>
              <div className="text-gray-400"><span className="text-neon-green">[SUCCESS]</span> 10:23:45 - Database connection established.</div>
              <div className="text-gray-400"><span className="text-neon-cyan">[INFO]</span> 10:15:02 - Admin session started by user sys_admin.</div>
              <div className="text-gray-400"><span className="text-yellow-500">[WARN]</span> 09:44:11 - High latency on module registry fetch (102ms).</div>
              <div className="text-gray-400"><span className="text-neon-green">[SUCCESS]</span> 08:30:00 - Daily backup completed successfully.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
