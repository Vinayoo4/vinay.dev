"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2, User, Phone, BookOpen, Briefcase, Github, Linkedin,
  Twitter, Mail, MapPin, Calendar, ArrowRight, CheckCircle,
  Globe, Database, Brain, Terminal, Layout
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";

function TypingEffect() {
  const [displayed, setDisplayed] = useState("");
  const fullText = "_____";
  const index = useRef(0);

  useEffect(() => {
    if (index.current < fullText.length) {
      const timeout = setTimeout(() => {
        // Only append if the character exists
        if (index.current < fullText.length) {
          setDisplayed((prev) => prev + fullText.charAt(index.current));
          index.current += 1;
        }
      }, 150); // Slightly slower for better readability
      return () => clearTimeout(timeout);
    }
  }, [displayed]);

  return (
    <span>{displayed}<span className="animate-pulse">|</span></span>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { 
      icon: Globe, 
      name: "Frontend Development", 
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX Design", "Responsive Design"] 
    },
    { 
      icon: Database, 
      name: "Financial Expertise", 
      items: ["Investment Strategy", "Portfolio Management", "Market Analysis", "Risk Assessment"] 
    },
    { 
      icon: Brain, 
      name: "Digital Marketing", 
      items: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics"] 
    },
    { 
      icon: Terminal, 
      name: "Trading & Investment", 
      items: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Portfolio Optimization"] 
    },
    { 
      icon: Layout, 
      name: "Design Skills", 
      items: ["UI/UX Design", "Wireframing", "Prototyping", "Brand Identity"] 
    },
    { 
      icon: Briefcase, 
      name: "Advisory Services", 
      items: ["Personal Finance", "Investment Planning", "Wealth Management", "Financial Education"] 
    }
  ];

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Shree Nandi Marketing Services",
      period: "2023 - Present",
      description: "Leading development of enterprise-scale applications using modern technologies.",
      achievements: [
        "Reduced application load time by 60%",
        "Implemented microservices architecture",
        "Gained working experience as the web developer and digital marketing expert"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2019 - 2021",
      description: "Developed and maintained multiple client projects using React and Node.js.",
      achievements: [
        "Delivered 15+ successful projects",
        "Introduced automated testing",
        "Improved code quality standards"
      ]
    }
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with real-time inventory management.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"]
    },
    {
      title: "AI Task Manager",
      description: "Smart task management system with AI-powered prioritization.",
      image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop&q=60",
      tags: ["React", "Python", "TensorFlow", "MongoDB"]
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard for monitoring business metrics in real-time.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      tags: ["Vue.js", "D3.js", "Node.js", "WebSocket"]
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), transparent 80%)`,
        }}
      />

      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Code2 className="w-8 h-8 text-yellow-500" />
              <span className="text-yellow-500 font-bold text-xl">Vinay.dev</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { icon: User, text: "About", href: "#about" },
                { icon: BookOpen, text: "Journey", href: "#journey" },
                { icon: Briefcase, text: "Portfolio", href: "#portfolio" },
                { icon: Phone, text: "Contact", href: "#contact" },
              ].map(({ icon: Icon, text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className="text-gray-300 hover:text-yellow-500 flex items-center space-x-1 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <ContactSection />
      <PortfolioSection />
      <JourneySection />
      <AboutSection />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
        </motion.div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500">
              <TypingEffect /> Developer
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-400">
              Crafting Digital Experiences Through Code
            </p>
            <p className="mt-4 text-lg text-gray-500">
               • Student • 
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {[
                { icon: Github, href: "https://github.com/Vinayoo4" },
                { icon: Linkedin, href: "https://linkedin.com/vinayyadav36" },
                { icon: Mail, href: "mailto:dev.webstylevinay9994@gmail.com" },
              ].map(({ icon: Icon, href }) => (
                <motion.a
                  key={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}