"use client";

import { useEffect, useState } from "react";
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
import CertificateSlider from "@/components/CertificateSlider";
import RetroIntro from "../components/RetroIntro";
import NewsletterForm from "../components/NewsletterForm";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Step 1: Show intro first, then newsletter, then homepage
  if (showIntro) {
    return <RetroIntro onFinish={() => { setShowIntro(false); setShowNewsletter(true); }} typeSpeed={18} />;
  }
  if (showNewsletter && !newsletterSubmitted) {
    return (
      <div>
        <NewsletterForm />
        <NewsletterSubmissionWatcher onSubmitted={() => setNewsletterSubmitted(true)} />
      </div>
    );
  }

  // Step 3: Homepage content (all sections, no SEO/metadata logic)
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
      <CertificateSlider />

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
              Vinay Developer
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-400">
              Hi, I'm Vinay — a student passionate about learning by building. My journey started with curiosity for how websites work, which led me to explore frontend development, UI/UX design, finance, digital marketing, and even HR strategy.<br /><br />
              Over time, I've completed hands-on projects like resume builders, billing dashboards, marketing tools, and data visualizations — each one teaching me something new. Along the way, I also took part in virtual internships with J.P. Morgan, Accenture, and Reliance to understand how things work in the real world.<br /><br />
              <span className="font-semibold text-yellow-400">Things I'm learning and working with:</span><br />
              Vue.js, React, Tailwind CSS, JavaScript, Figma, Excel, CRM Tools, Analytics, and Storytelling through design.<br /><br />
              I'm still learning — and building my way through it 🚀
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {[
                { icon: Github, href: "https://github.com/Vinayoo4" },
                { icon: Linkedin, href: "https://linkedin.com/in/vinay-yadav-dev" },
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

// Helper component to detect newsletter submission
function NewsletterSubmissionWatcher({ onSubmitted }: { onSubmitted: () => void }) {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const confirmation = document.querySelector(".min-h-screen.bg-black.text-green-400");
      if (confirmation && confirmation.textContent?.includes("Transmission received")) {
        onSubmitted();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [onSubmitted]);
  return null;
}