"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProjects } from "@/lib/data";
import {
  ExternalLink, Github, ArrowLeft, Tag, Code2,
  Sparkles, ChevronRight, Eye
} from "lucide-react";
import Link from "next/link";

const techColors: Record<string, string> = {
  Python: "text-neon-green border-neon-green/30 bg-neon-green/10",
  ML: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
  NLP: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  AI: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
  React: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  Next: "text-gray-200 border-gray-500/30 bg-gray-500/10",
  Node: "text-neon-green border-neon-green/30 bg-neon-green/10",
  Three: "text-neon-amber border-neon-amber/30 bg-neon-amber/10",
  Security: "text-neon-red border-neon-red/30 bg-neon-red/10",
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => {});
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
            <span className="text-neon-amber">Project</span> Vault
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Live tools, AI scripts, and full-stack applications — each one a SaltedHash build.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const isSelected = selected === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                layout
                onClick={() => setSelected(isSelected ? null : project.id)}
                className={`group relative p-6 rounded-xl glass-panel border cursor-pointer transition-all ${
                  isSelected
                    ? "border-neon-amber/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                    : "border-neon-amber/10 hover:border-neon-amber/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-amber/20 to-neon-amber/5 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-neon-amber" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-neon-green/20 text-neon-green font-mono">
                    {project.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white font-mono mb-2 group-hover:text-neon-amber transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 font-mono mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t: string) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 text-[10px] rounded-md border font-mono ${
                        techColors[t] || "text-gray-400 border-gray-600/30 bg-gray-600/10"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-neon-amber/10 space-y-3">
                        {project.highlights && (
                          <div>
                            <div className="text-[10px] text-gray-600 font-mono mb-2 uppercase tracking-wider">Highlights</div>
                            <div className="space-y-1">
                              {project.highlights.map((h: string) => (
                                <div key={h} className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                  <Sparkles className="w-3 h-3 text-neon-amber" />
                                  {h}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-2">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-neon-amber/10 text-neon-amber border border-neon-amber/30 hover:bg-neon-amber/20 transition-all font-mono"
                            >
                              <Eye className="w-3 h-3" /> Live Demo
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg glass-panel text-gray-400 border border-gray-700 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all font-mono"
                            >
                              <Github className="w-3 h-3" /> Source
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <Code2 className="w-12 h-12 mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500 font-mono">Loading projects...</p>
          </div>
        )}
      </div>
    </div>
  );
}
