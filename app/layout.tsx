import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { SaltAssistant } from "@/components/SaltAssistant";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  metadataBase: new URL("https://devvinay.me"),
  title: "SALTED HASH",
  description: "Problem-first venture studio and product lab with practical mini tools.",
  manifest: "/manifest.json",
  themeColor: "#233CB5",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <header className="site-header">
          <div className="container nav-wrap">
            <Link href="/" className="brand">SALTED HASH</Link>
            <nav>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="container main-content">{children}</main>

        <footer className="site-footer">
          <div className="container footer-wrap">
            <p>© {new Date().getFullYear()} SALTED HASH · devvinay.me</p>
            <div className="footer-links">
              {navLinks.slice(1).map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

        <SaltAssistant />
      </body>
    </html>
  );
}
