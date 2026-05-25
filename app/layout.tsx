import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Hexagon, Network, Brain, Briefcase, MessageSquare, Phone, Menu, X } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "SaltedHash — AI-Powered Digital Solutions",
  description: "AI/ML solutions, Python automation, SPA/PWA development, and SaaS builds by Vinay.",
  manifest: "/manifest.json",
  themeColor: "#050505",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "SaltedHash" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${mono.variable} font-sans bg-[#050505] text-gray-100 antialiased`}>
        <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-neon-cyan/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Hexagon className="w-8 h-8 text-neon-cyan animate-neon-pulse" strokeWidth={1.5} />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-neon-cyan font-mono">SH</span>
                </div>
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-neon-cyan">Salted</span>
                  <span className="text-gray-400">Hash</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {[
                  { icon: Network, label: "Dashboard", href: "/" },
                  { icon: Brain, label: "Services", href: "/services" },
                  { icon: Briefcase, label: "Portfolio", href: "/portfolio" },
                  { icon: MessageSquare, label: "Chat", href: "/chat" },
                  { icon: Phone, label: "Contact", href: "/contact" },
                ].map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-cyan transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:animate-neon-pulse" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              <MobileMenu />
            </div>
          </div>
        </nav>

        <main className="pt-16 min-h-screen">{children}</main>

        <footer className="border-t border-neon-cyan/10 py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Hexagon className="w-4 h-4 text-neon-cyan" strokeWidth={1.5} />
              <span>SaltedHash — Built with intelligence</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>© {new Date().getFullYear()} Vinay</span>
              <span>AI-Powered</span>
              <span>Local-First</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="list-none flex items-center cursor-pointer p-2 text-gray-400 hover:text-neon-cyan transition-colors">
          <Menu className="w-5 h-5 group-open:hidden" />
          <X className="w-5 h-5 hidden group-open:block" />
        </summary>
        <div className="fixed top-16 inset-x-0 bottom-0 bg-[#050505]/95 backdrop-blur-xl border-t border-neon-cyan/20 p-6 flex flex-col gap-4">
          {[
            { icon: Network, label: "Dashboard", href: "/" },
            { icon: Brain, label: "Services", href: "/services" },
            { icon: Briefcase, label: "Portfolio", href: "/portfolio" },
            { icon: MessageSquare, label: "Chat", href: "/chat" },
            { icon: Phone, label: "Contact", href: "/contact" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl glass-panel text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
