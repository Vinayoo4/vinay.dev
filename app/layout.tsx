import './globals.css';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';

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
      <body className="font-sans antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}