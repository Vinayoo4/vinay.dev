import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ShieldAlert, CheckCircle2 } from "lucide-react";

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  status: "live" | "development" | "planned";
  url?: string;
  icon: React.ReactNode;
}

export function ModuleCard({ id, name, description, status, url, icon }: ModuleCardProps) {
  const isLive = status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl glass-panel border transition-all h-full flex flex-col ${
        isLive ? "border-neon-cyan/20 hover:border-neon-cyan/50" : "border-gray-800 opacity-70"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${isLive ? "bg-neon-cyan/10 text-neon-cyan" : "bg-gray-800 text-gray-400"}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {status === "live" && <><CheckCircle2 className="w-3 h-3 text-neon-green" /><span className="text-neon-green">LIVE</span></>}
          {status === "development" && <><ShieldAlert className="w-3 h-3 text-yellow-500" /><span className="text-yellow-500">DEV</span></>}
          {status === "planned" && <><span className="text-gray-500">PLANNED</span></>}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white font-mono mb-2">{name}</h3>
      <p className="text-sm text-gray-400 font-mono flex-grow mb-6">{description}</p>

      {isLive && url ? (
        <Link
          href={url}
          className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 transition-colors font-mono text-sm group"
        >
          Launch Module <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      ) : (
        <div className="w-full p-3 rounded-lg bg-gray-900 text-gray-500 text-center font-mono text-sm cursor-not-allowed border border-gray-800">
          Module Unavailable
        </div>
      )}
    </motion.div>
  );
}
