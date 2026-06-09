"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Hexagon, LayoutGrid, Zap, Shield, ArrowRight, ChevronDown, Activity, Globe, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: LayoutGrid, value: "30+", label: "Modules Integrated" },
  { icon: Zap, value: "1", label: "Centralized OS" },
  { icon: Activity, value: "Live", label: "Platform Status" },
  { icon: Shield, value: "Secure", label: "Unified Auth" },
];

const quickLinks = [
  { icon: ImageIcon, label: "Platform Gallery", desc: "Take an immersive tour", href: "/gallery" },
  { icon: LayoutGrid, label: "App Registry", desc: "Access all platform modules", href: "/modules" },
  { icon: Activity, label: "Dashboard", desc: "Your personal control center", href: "/dashboard" },
];

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-neural">
      <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(6,182,212,0.08) 0%, transparent 60%)`,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-neon-cyan/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-neon-pulse" />
              <span className="text-xs text-neon-cyan font-mono tracking-wider">SYSTEM ONLINE — PLATFORM CORE ACTIVE</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
                SALTEDHASH
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-4 font-mono">
              The centralized umbrella platform. Your gateway to all apps, modules, and services.
            </p>
            <p className="text-sm text-gray-600 font-mono mb-10">
              One shell. One identity. Infinite modules.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all font-mono text-sm"
              >
                Tour The Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/login"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-panel border border-gray-800 text-gray-300 hover:border-neon-purple/30 hover:text-neon-purple transition-all font-mono text-sm"
              >
                Sign In to Platform <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-neon-cyan/50" />
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass-panel border border-neon-cyan/10 text-center group hover:border-neon-cyan/30 transition-all"
              >
                <Icon className="w-6 h-6 mx-auto mb-3 text-neon-cyan group-hover:animate-neon-pulse" />
                <div className="text-2xl font-bold text-white font-mono mb-1">{value}</div>
                <div className="text-xs text-gray-500 font-mono">{label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map(({ icon: Icon, label, desc, href }) => (
              <Link key={label} href={href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl glass-panel border border-neon-cyan/10 hover:border-neon-cyan/30 group cursor-pointer transition-all h-full"
                >
                  <Icon className="w-8 h-8 text-neon-cyan mb-4 group-hover:animate-neon-pulse" />
                  <h3 className="text-lg font-semibold text-white font-mono mb-2">{label}</h3>
                  <p className="text-sm text-gray-500 font-mono">{desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
