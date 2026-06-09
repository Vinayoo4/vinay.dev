"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { GalleryExhibit } from "@/components/gallery/GalleryExhibit";
import { Database, Brain, Lock, Settings, Layout, Code, Activity, Hexagon, ArrowDown } from "lucide-react";
import Link from "next/link";

const galleryModules = [
  { id: "core", name: "SALTEDHASH Core", description: "The central nervous system. A shared API and data layer uniting the entire ecosystem under one unified protocol.", status: "live", url: "/dashboard", icon: <Database className="w-8 h-8" /> },
  { id: "auth", name: "Identity Node", description: "Seamless, secure, and centralized authentication. One credential key to unlock every module within the platform.", status: "live", url: "/auth/login", icon: <Lock className="w-8 h-8" /> },
  { id: "triu", name: "TRIU", description: "Advanced predictive analytics. Transforming raw platform data into actionable, machine-learned foresight.", status: "development", icon: <Brain className="w-8 h-8" /> },
  { id: "quantifyai", name: "Quantify AI", description: "Intelligent data parsing and visual analysis, bringing clarity to complex operational metrics.", status: "development", icon: <Activity className="w-8 h-8" /> },
  { id: "blinkpage", name: "Blink Page", description: "Rapid deployment infrastructure for high-conversion landing pages and ephemeral campaigns.", status: "planned", icon: <Layout className="w-8 h-8" /> },
  { id: "devnote", name: "DevNote Stories", description: "A collaborative narrative space for engineers to document, share, and preserve architectural decisions.", status: "planned", icon: <Code className="w-8 h-8" /> },
] as const;

export default function GalleryPage() {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const backgroundGradient = useMotionTemplate`radial-gradient(circle at ${useTransform(pointerX, x => x * 100)}% ${useTransform(pointerY, y => y * 100)}%, rgba(6,182,212,0.06) 0%, transparent 40%)`;

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        pointerX.set(e.clientX / window.innerWidth);
        pointerY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY]);

  return (
    <div className="min-h-screen bg-[#020202] text-white relative selection:bg-neon-cyan/30">
      {/* Interactive Spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: backgroundGradient }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 z-10 overflow-hidden">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] border border-gray-800/30 rounded-full absolute animate-[spin_60s_linear_infinite]" />
          <div className="w-[600px] h-[600px] border border-gray-800/40 rounded-full absolute animate-[spin_40s_linear_infinite_reverse]" />
          <div className="w-[400px] h-[400px] border border-neon-cyan/10 rounded-full absolute animate-[spin_20s_linear_infinite]" />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 mb-8 backdrop-blur-sm">
              <Hexagon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 font-mono tracking-[0.2em]">THE ECOSYSTEM GALLERY</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              A Living <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-gray-500">Platform</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed mb-12">
              Explore the interconnected architecture of SALTEDHASH.
              Each module is a purpose-built exhibit within our unified corporate ecosystem.
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 flex flex-col items-center text-gray-500 font-mono text-xs gap-2"
        >
          <span>BEGIN TOUR</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Gallery Exhibits */}
      <section className="relative z-10 pb-32">
        {galleryModules.map((module, index) => (
          <GalleryExhibit key={module.id} {...module} index={index} />
        ))}
      </section>

      {/* Floating Admin Button */}
      <Link href="/admin">
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900/90 backdrop-blur-md border border-neon-cyan/30 text-neon-cyan font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-neon-cyan transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden md:inline">Command Center</span>
        </motion.button>
      </Link>
    </div>
  );
}
