"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCertifications } from "@/lib/data";
import {
  GraduationCap, Cpu, Briefcase, Sparkles, ChartLine,
  ChevronRight, ExternalLink, Calendar, ArrowLeft
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  "graduation-cap": GraduationCap,
  cpu: Cpu,
  briefcase: Briefcase,
  sparkles: Sparkles,
  "chart-line": ChartLine,
};

export default function AboutPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications().then(setCerts).catch(() => {});
  }, []);

  const milestones = certs.filter((c) => c.status !== "");

  return (
    <div className="min-h-screen bg-neural py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:underline font-mono mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3">
            <span className="text-neon-purple">Narrative</span> Timeline
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Interactive journey from Class 12 to founding SaltedHash — each node is a milestone with proof.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-amber opacity-30" />

          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon] || GraduationCap;
              const isSelected = selected === milestone.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-14"
                >
                  <div
                    className={`absolute left-[14px] top-2 w-[18px] h-[18px] rounded-full border-2 cursor-pointer transition-all ${
                      milestone.status === "completed"
                        ? "bg-neon-green border-neon-green shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "bg-[#050505] border-neon-amber animate-neon-pulse"
                    }`}
                    onClick={() => setSelected(isSelected ? null : milestone.id)}
                  />

                  <div
                    className={`p-5 rounded-xl glass-panel border cursor-pointer transition-all ${
                      isSelected
                        ? "border-neon-purple/40 shadow-neon-purple"
                        : "border-neon-purple/10 hover:border-neon-purple/30"
                    }`}
                    onClick={() => setSelected(isSelected ? null : milestone.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className="w-5 h-5 flex-shrink-0" style={{ color: milestone.color }} />
                        <div>
                          <h3 className="text-base font-semibold text-white font-mono truncate">{milestone.label}</h3>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] text-gray-600 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {milestone.year}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${
                          isSelected ? "rotate-90" : ""
                        }`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-neon-purple/10">
                            {milestone.proof && milestone.proof.length > 0 && (
                              <div className="mb-4">
                                <div className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">Evidence</div>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.proof.map((p: string) => (
                                    <span key={p} className="px-2 py-1 text-xs rounded-md bg-neon-purple/10 text-neon-purple font-mono">
                                      {p.split("/").pop()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {milestone.status === "completed" && (
                              <div className="flex items-center gap-2 text-xs text-neon-green font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-neon-pulse" />
                                MILESTONE ACHIEVED
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {milestones.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⚡</div>
            <p className="text-gray-500 font-mono">Loading timeline data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
