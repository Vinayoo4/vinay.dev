"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, Save, Key } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  return (
    <div className="min-h-screen bg-neural py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white font-mono mb-2">Platform Identity</h1>
          <p className="text-gray-400 font-mono text-sm">Manage your global profile settings.</p>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-xl glass-panel border border-neon-cyan/20"
          >
            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-neon-cyan" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900/50 border border-neon-cyan/20 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-neon-cyan/20 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors font-mono text-sm border border-neon-cyan/30 mt-4">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-xl glass-panel border border-neon-purple/20"
          >
            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-neon-purple" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono mb-1">Password</h3>
                  <p className="text-xs text-gray-500 font-mono">Last changed 3 months ago.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors font-mono text-sm">
                  <Key className="w-4 h-4" /> Update
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono mb-1">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray-500 font-mono">Add an extra layer of security.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-colors font-mono text-sm">
                  Enable 2FA
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
