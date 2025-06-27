"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Could not send your message. Please try again later.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com",
      label: "Follow me on GitHub",
      username: "@vinaydev"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com",
      label: "Connect on LinkedIn",
      username: "Vinay Developer"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com",
      label: "Follow me on Twitter",
      username: "@vinaydev"
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
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">Let's Connect</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href="mailto:contact@vinay.dev"
              className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group"
            >
              <Mail className="w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <div className="text-left">
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Email me at</p>
                <p className="text-gray-300 font-semibold group-hover:text-yellow-500 transition-colors">contact@vinay.dev</p>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group"
            >
              <MapPin className="w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <div className="text-left">
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Based in</p>
                <p className="text-gray-300 font-semibold group-hover:text-yellow-500 transition-colors">New York, USA</p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 + 0.2 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                  <span className="text-gray-300 text-sm group-hover:text-yellow-500 transition-colors">{link.username}</span>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-gray-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-gray-200"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-black/50 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-gray-200"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {submitStatus === "success" && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}