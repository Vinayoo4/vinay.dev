"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Github, Linkedin, Send, ArrowLeft,
  Hexagon, CheckCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-neural py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:underline font-mono mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3">
            <span className="text-neon-green">Connect</span> Signal
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Open a channel — project inquiries, collaboration, or just to say hi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              <a
                href="mailto:dev.webstylevinay9994@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-neon-green/10 hover:border-neon-green/30 group transition-all"
              >
                <Mail className="w-5 h-5 text-neon-green group-hover:animate-neon-pulse" />
                <div>
                  <div className="text-xs text-gray-500 font-mono">Email</div>
                  <div className="text-sm text-gray-300 font-mono">dev.webstylevinay9994@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-neon-green/10">
                <MapPin className="w-5 h-5 text-neon-green" />
                <div>
                  <div className="text-xs text-gray-500 font-mono">Location</div>
                  <div className="text-sm text-gray-300 font-mono">Haryana, India</div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com/Vinayoo4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-panel border border-gray-800 hover:border-neon-cyan/30 text-gray-400 hover:text-neon-cyan transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/vinay-yadav-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-panel border border-gray-800 hover:border-neon-cyan/30 text-gray-400 hover:text-neon-cyan transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-gray-800 focus:border-neon-green/40 text-sm text-gray-200 font-mono outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-gray-800 focus:border-neon-green/40 text-sm text-gray-200 font-mono outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-mono mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-gray-800 focus:border-neon-green/40 text-sm text-gray-200 font-mono outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon-green/20 border border-neon-green/30 text-neon-green hover:bg-neon-green/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-sm"
              >
                {status === "sending" ? (
                  <>
                    <Hexagon className="w-4 h-4 animate-spin" /> Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Transmission
                  </>
                )}
              </button>

              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-mono"
                >
                  <CheckCircle className="w-4 h-4" /> Message sent successfully!
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-neon-red/10 border border-neon-red/20 text-neon-red text-sm font-mono"
                >
                  <AlertCircle className="w-4 h-4" /> Transmission failed. Try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
