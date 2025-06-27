import { motion } from "framer-motion";
import { CheckCircle, Globe, Database, Brain, Terminal, Layout, Briefcase } from "lucide-react";

const skills = [
  { icon: Globe, name: "Frontend Development", items: ["React", "Next.js", "TypeScript","Vue" , "Tailwind CSS", "UI/UX Design", "Responsive Design"] },
  { icon: Database, name: "Financial Expertise", items: ["Investment Strategy", "Portfolio Management", "Market Analysis", "Risk Assessment"] },
  { icon: Brain, name: "Digital Marketing", items: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics"] },
  { icon: Terminal, name: "Trading & Investment", items: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Portfolio Optimization"] },
  { icon: Layout, name: "Design Skills", items: ["UI/UX Design", "Wireframing", "Prototyping", "Brand Identity"] },
  { icon: Briefcase, name: "Advisory Services", items: ["Personal Finance", "Investment Planning", "Wealth Management", "Financial Education"] }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">Professional Competencies</h2>
          <p className="mt-4 text-gray-400">A comprehensive suite of skills designed to support robust, scalable, and innovative web solutions for modern businesses and creators.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(({ icon: Icon, name, items }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-colors"
            >
              <Icon className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">{name}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-gray-400 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 