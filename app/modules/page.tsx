"use client";

import { useState } from "react";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Search, Database, Brain, Activity, LineChart, Code, Cloud, Lock, Settings, Layout, ShoppingCart, User, Users, GraduationCap, Video, Briefcase, Zap, Heart, Sprout, Gamepad } from "lucide-react";
import { motion } from "framer-motion";

const modulesData = [
  { id: "core", name: "SALTEDHASH Core", description: "Main API and central services handling shared data.", status: "live", url: "/dashboard", icon: <Database className="w-6 h-6" /> },
  { id: "triu", name: "TRIU", description: "Advanced predictive analytics and machine learning insights.", status: "development", icon: <Brain className="w-6 h-6" /> },
  { id: "accounting", name: "Accounting Precision", description: "Enterprise-grade accounting and financial tracking.", status: "planned", icon: <LineChart className="w-6 h-6" /> },
  { id: "dentistpro", name: "DentistPro360", description: "Comprehensive dental clinic management system.", status: "planned", icon: <Activity className="w-6 h-6" /> },
  { id: "denttech", name: "DentTech", description: "Technical solutions for dental applications.", status: "planned", icon: <Activity className="w-6 h-6" /> },
  { id: "quantifyai", name: "Quantify AI", description: "AI-driven data analysis platform.", status: "development", icon: <Code className="w-6 h-6" /> },
  { id: "aurajam", name: "Aurajam", description: "Music and audio streaming application.", status: "planned", icon: <Video className="w-6 h-6" /> },
  { id: "snapsnazz", name: "SnapSnazz", description: "Creative photo and media platform.", status: "planned", icon: <Layout className="w-6 h-6" /> },
  { id: "inspoalert", name: "InspoAlert", description: "Inspirational content aggregator and alerts.", status: "planned", icon: <Zap className="w-6 h-6" /> },
  { id: "viberesume", name: "Vibe Resume", description: "Modern resume building and management tool.", status: "planned", icon: <Briefcase className="w-6 h-6" /> },
  { id: "blinkpage", name: "Blink Page", description: "Quick landing page generator.", status: "planned", icon: <Layout className="w-6 h-6" /> },
  { id: "devnote", name: "DevNote Stories", description: "Platform for developer stories and notes.", status: "planned", icon: <Code className="w-6 h-6" /> },
  { id: "snap", name: "Snap & Code Shop", description: "Marketplace for developers and designers.", status: "planned", icon: <Cloud className="w-6 h-6" /> },
  { id: "twittable", name: "Twittable Snippets", description: "Shareable code snippets for social media.", status: "planned", icon: <Code className="w-6 h-6" /> },
  { id: "snippetcollector", name: "Snippet Collector", description: "Organize and save your favorite code snippets.", status: "planned", icon: <Code className="w-6 h-6" /> },
  { id: "emojify", name: "Emojify Snippets", description: "Add emojis to your code snippets.", status: "planned", icon: <Code className="w-6 h-6" /> },
  { id: "codecanvas", name: "Code Canvas", description: "Visual code editing and presentation tool.", status: "planned", icon: <Layout className="w-6 h-6" /> },
  { id: "flashfocus", name: "FlashFocus", description: "Productivity timer and focus app.", status: "planned", icon: <Activity className="w-6 h-6" /> },
  { id: "hashtager", name: "Hashtager", description: "Hashtag generation and analysis.", status: "planned", icon: <Code className="w-6 h-6" /> },
  { id: "microstartup", name: "Microstartup Society", description: "Community for microstartup founders.", status: "planned", icon: <Users className="w-6 h-6" /> },
  { id: "herbal", name: "Herbal Living Community", description: "Community for herbal and natural living.", status: "planned", icon: <Heart className="w-6 h-6" /> },
  { id: "educomp", name: "EduComp Community", description: "Educational computing community.", status: "planned", icon: <GraduationCap className="w-6 h-6" /> },
  { id: "urbangarden", name: "Urban Gardening Club", description: "Community for urban gardening enthusiasts.", status: "planned", icon: <Sprout className="w-6 h-6" /> },
  { id: "mindfulness", name: "Mindfulness Micro Course", description: "Short courses on mindfulness.", status: "planned", icon: <Heart className="w-6 h-6" /> },
  { id: "studentfinance", name: "Student Finance Mentor", description: "Financial guidance for students.", status: "planned", icon: <LineChart className="w-6 h-6" /> },
  { id: "reflectionstudio", name: "Reflection Studio", description: "App for personal reflection and journaling.", status: "planned", icon: <User className="w-6 h-6" /> },
  { id: "ecowise", name: "EcoWise Wealth Digest", description: "Eco-friendly wealth management insights.", status: "planned", icon: <LineChart className="w-6 h-6" /> },
  { id: "mealprep", name: "Meal Prep Starter Kit", description: "Tools and recipes for meal prep.", status: "planned", icon: <ShoppingCart className="w-6 h-6" /> },
  { id: "codespace", name: "Code Space Makeover", description: "Tips for improving your coding environment.", status: "planned", icon: <Layout className="w-6 h-6" /> },
  { id: "hexcoaster", name: "HexCoaster", description: "Hexagonal coaster design application.", status: "planned", icon: <Gamepad className="w-6 h-6" /> },
  { id: "greenthumb", name: "Green Thumb Subscription", description: "Subscription service for plant lovers.", status: "planned", icon: <Sprout className="w-6 h-6" /> },
  { id: "veganmeal", name: "Vegan Meal Planning Hub", description: "Central hub for vegan meal plans.", status: "planned", icon: <ShoppingCart className="w-6 h-6" /> },
] as const;

export default function ModulesPage() {
  const [search, setSearch] = useState("");

  const filteredModules = modulesData.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neural py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-white font-mono mb-2">Platform Modules</h1>
              <p className="text-gray-400 font-mono text-sm">Access and manage integrated applications.</p>
            </div>

            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search modules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900/50 border border-neon-cyan/20 rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-mono">
            No modules found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
