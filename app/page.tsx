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
                <div className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
                        <p className="mb-4">
                          <span className="font-bold text-yellow-400">I’m Vinay Yadav</span>, a student with a deep interest in how design, technology, and business strategy come together to create meaningful digital experiences.
                        </p>
                        <p className="mb-4">
                          My learning journey has been shaped by hands-on exploration across several domains — from <span className="font-semibold text-yellow-400">web development</span> and <span className="font-semibold text-yellow-400">UI/UX design</span> to <span className="font-semibold text-yellow-400">finance analytics</span>, <span className="font-semibold text-yellow-400">digital marketing</span>, and <span className="font-semibold text-yellow-400">human resources</span>. I believe that being multi-curious helps me approach problems with flexibility and fresh perspectives.
                        </p>
                        <p className="mb-4">
                          Most of the projects I’ve worked on were created to teach myself — whether it was a <span className="font-semibold text-yellow-400">resume builder</span> to simplify hiring processes, a <span className="font-semibold text-yellow-400">billing dashboard</span> for small businesses, or a <span className="font-semibold text-yellow-400">campaign tool</span> to understand lead generation. Each project helped me connect technical skills with real-world applications.
                        </p>
                        <p className="mb-4">
                          To better understand how these domains work in industry, I’ve also completed virtual programs with organizations like <span className="font-semibold text-yellow-400">J.P. Morgan</span>, <span className="font-semibold text-yellow-400">Accenture</span>, and <span className="font-semibold text-yellow-400">Reliance Industries</span>, gaining exposure to financial modeling, data-driven storytelling, and public relations strategy.
                        </p>
                        <p className="mb-4">
                          I am currently focused on growing my <span className="font-semibold text-yellow-400">frontend development</span> skills using modern frameworks like <span className="font-semibold text-yellow-400">Vue</span> and <span className="font-semibold text-yellow-400">React</span>, while continuing to study design systems, user behavior, and data visualization. I enjoy working on things that combine structure and creativity, and I’m always open to new ideas, mentorship, and collaborative learning.
                        </p>
                        <p className="mb-4">
                          As a student, I don’t have all the answers yet — but I’m constantly learning, building, and looking for ways to grow through experience and collaboration.
                        </p>
                        <p className="mt-6 text-yellow-400 font-bold text-xl">
                          I am still learning — and building my way through it 🚀
                        </p>
    </div>
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