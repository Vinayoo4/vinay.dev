"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: `A full-featured online shopping platform with real-time inventory management.
        Built with Next.js and TypeScript, this platform handles thousands of daily transactions.
        Features include real-time inventory tracking, AI-powered product recommendations,
        advanced search capabilities, and seamless payment processing with Stripe integration.
        The platform achieved a 40% increase in conversion rates and 60% faster page load times.`,
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      link: "https://example-ecommerce.com",
      github: "https://github.com/example/ecommerce",
      metrics: {
        users: "100K+",
        transactions: "500K+",
        performance: "+60%"
      }
    },
    {
      title: "AI Task Manager",
      description: `Smart task management system with AI-powered prioritization.
        Leverages machine learning to automatically prioritize tasks based on user behavior and deadlines.
        Includes features like natural language processing for task creation, smart categorization,
        and predictive task completion estimates. The system helped increase team productivity by 35%.`,
      image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop&q=60",
      tags: ["React", "Python", "TensorFlow", "MongoDB"],
      link: "https://ai-taskmanager.com",
      github: "https://github.com/example/ai-tasks",
      metrics: {
        users: "50K+",
        tasks: "1M+",
        efficiency: "+35%"
      }
    },
    {
      title: "Real-time Analytics Dashboard",
      description: `Interactive dashboard for monitoring business metrics in real-time.
        Built with Vue.js and D3.js, this dashboard provides real-time insights into business performance.
        Features include customizable widgets, advanced data visualization, automated reporting,
        and predictive analytics. Helped clients reduce decision-making time by 50%.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      tags: ["Vue.js", "D3.js", "Node.js", "WebSocket"],
      link: "https://analytics-dashboard.com",
      github: "https://github.com/example/analytics",
      metrics: {
        clients: "200+",
        dataPoints: "10M+",
        improvement: "+50%"
      }
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">Portfolio</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore my featured projects showcasing innovation and technical excellence.
            <span className="block mt-2 text-sm text-gray-500">
              Use arrow keys or swipe to navigate through projects
            </span>
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-[600px] perspective-1000 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ scale: 0.8, rotateY: 45, x: 1000 }}
                  animate={{
                    scale: index === activeIndex ? 1 : 0.8,
                    rotateY: index === activeIndex ? 0 : index < activeIndex ? -45 : 45,
                    x: index === activeIndex ? 0 : index < activeIndex ? -1000 : 1000,
                    zIndex: projects.length - Math.abs(index - activeIndex)
                  }}
                  exit={{ scale: 0.8, rotateY: -45, x: -1000 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full max-w-3xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-yellow-500/5 rounded-xl border border-yellow-500/10 overflow-hidden shadow-xl backdrop-blur-sm">
                    <div className="aspect-video relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-yellow-500">{project.title}</h3>
                        <div className="flex space-x-4">
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-6 h-6 text-yellow-500 hover:text-yellow-400 transition-colors" />
                          </Link>
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-6 h-6 text-yellow-500 hover:text-yellow-400 transition-colors" />
                          </Link>
                        </div>
                      </div>
                      <p className={`text-gray-400 mb-6 ${selectedProject === index ? "" : "line-clamp-2"}`}>
                        {project.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 rounded-lg bg-yellow-500/5">
                            <div className="text-yellow-500 font-bold">{value}</div>
                            <div className="text-gray-500 text-sm capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-yellow-500' : 'bg-yellow-500/20'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}