"use client";

import { motion } from "framer-motion";
import { CheckCircle, Globe, Database, Brain, Terminal, Layout, Briefcase } from "lucide-react";
import Link from "next/link";

export default function About() {
  const skills = [
    { 
      icon: Globe, 
      name: "Frontend Development",
      link: "https://reactjs.org",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX Design", "Responsive Design"] 
    },
    { 
      icon: Database, 
      name: "Financial Expertise",
      link: "https://www.investopedia.com",
      items: ["Investment Strategy", "Portfolio Management", "Market Analysis", "Risk Assessment"] 
    },
    { 
      icon: Brain, 
      name: "Digital Marketing",
      link: "https://www.hubspot.com",
      items: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics"] 
    },
    { 
      icon: Terminal, 
      name: "Trading & Investment",
      link: "https://www.tradingview.com",
      items: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Portfolio Optimization"] 
    },
    { 
      icon: Layout, 
      name: "Design Skills",
      link: "https://www.figma.com",
      items: ["UI/UX Design", "Wireframing", "Prototyping", "Brand Identity"] 
    },
    { 
      icon: Briefcase, 
      name: "Advisory Services",
      link: "https://www.personalfinance.org",
      items: ["Personal Finance", "Investment Planning", "Wealth Management", "Financial Education"] 
    }
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">About Me</h1>
          <p className="text-gray-400 max-w-3xl mx-auto mb-12">
            With over a decade of experience in web development, financial markets, and digital marketing,
            I bring a unique blend of technical expertise and business acumen to every project.
            My mission is to create innovative solutions that drive real business value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(({ icon: Icon, name, items, link }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/30 hover:bg-yellow-500/10 transition-all duration-300 group"
            >
              <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
                <Icon className="w-8 h-8 text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors" />
                <h3 className="text-xl font-semibold text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors">{name}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-gray-400 flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                      <CheckCircle className="w-4 h-4 text-yellow-500/70 group-hover:text-yellow-400 transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}