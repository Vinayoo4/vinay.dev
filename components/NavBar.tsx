'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, User, Phone, BookOpen, Briefcase, MessageSquare, Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { icon: User, text: 'About', href: '/about' },
  { icon: BookOpen, text: 'Journey', href: '/journey' },
  { icon: Briefcase, text: 'Portfolio', href: '/portfolio' },
  { icon: MessageSquare, text: 'Chat', href: '/chat' },
  { icon: Phone, text: 'Contact', href: '/contact' },
  { icon: Shield, text: 'Admin', href: '/admin' },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-yellow-500" />
            <span className="text-yellow-500 font-bold text-xl">Vinay.dev</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ icon: Icon, text, href }) => (
              <Link
                key={text}
                href={href}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  pathname === href ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{text}</span>
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-yellow-500 transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-yellow-900/20 px-4 py-4 space-y-1">
          {navLinks.map(({ icon: Icon, text, href }) => (
            <Link
              key={text}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === href
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{text}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
