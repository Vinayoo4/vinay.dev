"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchServices } from "@/lib/data";
import { NeuralGraph } from "@/components/NeuralGraph";
import {
  Brain, Terminal, Layout, Smartphone, Cloud,
  ChevronRight, CheckCircle, Clock, ArrowLeft
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  brain: Brain, terminal: Terminal, layout: Layout,
  smartphone: Smartphone, cloud: Cloud,
};

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    fetchServices().then(setServices).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-neural py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:underline font-mono mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3">
            <span className="text-neon-cyan">Decision</span> Path Explorer
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            BFS/DFS interactive tree — click service nodes to trace the path. Each node represents a capability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {services.length > 0 && (
              <NeuralGraph nodes={services} width={700} height={500} />
            )}
          </div>

          <div className="space-y-4">
            <div className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-wider">All Services</div>
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Brain;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(selected?.id === svc.id ? null : svc)}
                  className={`p-4 rounded-xl glass-panel border cursor-pointer transition-all ${
                    selected?.id === svc.id
                      ? "border-neon-cyan/40 shadow-neon-cyan"
                      : "border-neon-cyan/10 hover:border-neon-cyan/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: svc.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-mono text-white truncate">{svc.label}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                          svc.status === "completed" ? "bg-neon-green" :
                          svc.status === "in-progress" ? "bg-neon-amber" : "bg-gray-500"
                        }`} />
                        <span className="text-[10px] text-gray-500 font-mono uppercase">{svc.status}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${
                      selected?.id === svc.id ? "rotate-90" : ""
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-8 rounded-2xl glass-panel border border-neon-cyan/20"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                    {selected.icon && React.createElement(iconMap[selected.icon] || Brain, {
                      className: "w-6 h-6",
                      style: { color: selected.color }
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono">{selected.label}</h3>
                    <p className="text-sm text-gray-400 mt-1">{selected.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  selected.status === "completed" ? "bg-neon-green/20 text-neon-green" :
                  selected.status === "in-progress" ? "bg-neon-amber/20 text-neon-amber" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {selected.status.toUpperCase()}
                </span>
              </div>

              {selected.details?.offerings && (
                <div className="mb-6">
                  <div className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-wider">Offerings</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.details.offerings.map((o: string) => (
                      <span key={o} className="px-3 py-1.5 text-sm rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-mono">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.details?.tech && (
                <div className="mb-6">
                  <div className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-wider">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.details.tech.map((t: string) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.details?.caseStudy && (
                <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                    <span className="text-xs text-gray-500 font-mono uppercase">Case Study</span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono">{selected.details.caseStudy}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
