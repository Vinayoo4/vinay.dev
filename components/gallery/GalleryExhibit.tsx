import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface GalleryExhibitProps {
  id: string;
  name: string;
  description: string;
  status: "live" | "development" | "planned";
  url?: string;
  icon: React.ReactNode;
  index: number;
}

export function GalleryExhibit({ id, name, description, status, url, icon, index }: GalleryExhibitProps) {
  const isLive = status === "live";
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={`relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center py-20 border-b border-gray-800/50 ${index % 2 === 0 ? 'bg-gradient-to-r from-neural to-transparent' : 'bg-gradient-to-l from-neural to-transparent'}`}
    >
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl ${isLive ? "bg-neon-cyan/10 text-neon-cyan shadow-[0_0_30px_rgba(6,182,212,0.2)]" : "bg-gray-800 text-gray-400"}`}>
                {icon}
              </div>
              <div>
                <div className="text-xs font-mono tracking-widest text-gray-500 mb-1">EXHIBIT {String(index + 1).padStart(2, '0')}</div>
                <div className="flex items-center gap-2">
                  {status === "live" && <span className="px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green text-[10px] font-mono border border-neon-green/20">LIVE SYSTEM</span>}
                  {status === "development" && <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-mono border border-yellow-500/20">IN DEVELOPMENT</span>}
                  {status === "planned" && <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px] font-mono border border-gray-700">CONCEPT</span>}
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-mono">
              {name}
            </h2>

            <p className="text-lg text-gray-400 font-mono leading-relaxed mb-8">
              {description}
            </p>

            {isLive && url && (
              <Link
                href={url}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-mono text-sm font-bold"
              >
                Access Interface <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        </div>

        <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative aspect-square md:aspect-auto md:h-full flex items-center justify-center`}>
          <motion.div
            className={`w-full max-w-sm aspect-[4/5] rounded-2xl glass-panel border flex items-center justify-center relative overflow-hidden group ${isLive ? 'border-neon-cyan/30 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : 'border-gray-800'}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${isLive ? 'from-neon-cyan/50 to-transparent' : 'from-gray-700 to-transparent'}`} />

            <motion.div
              className={`relative z-10 p-8 rounded-full ${isLive ? 'bg-neon-cyan/5 border border-neon-cyan/20' : 'bg-gray-900 border border-gray-800'}`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className={`transform scale-[2] ${isLive ? 'text-neon-cyan' : 'text-gray-500'}`}>
                 {icon}
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
