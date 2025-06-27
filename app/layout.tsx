import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Code2, User, Phone, BookOpen, Briefcase, MessageSquare } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinay Developer - Full Stack Developer & Financial Expert',
  description: 'Professional portfolio of Vinay, a Full Stack Developer with expertise in web development, finance, and digital marketing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Code2 className="w-8 h-8 text-yellow-500" />
                <span className="text-yellow-500 font-bold text-xl">Vinay.dev</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { icon: User, text: "About", href: "/about" },
                  { icon: BookOpen, text: "Journey", href: "/journey" },
                  { icon: Briefcase, text: "Portfolio", href: "/portfolio" },
                  { icon: MessageSquare, text: "Chat", href: "/chat" },
                  { icon: Phone, text: "Contact", href: "/contact" },
                  { icon: Code2, text: "Admin", href: "/admin" },
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
        {children}
      </body>
    </html>
  );
}