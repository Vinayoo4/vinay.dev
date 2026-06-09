import { ReactNode } from "react";
import { LayoutDashboard, LogOut, Settings, Package } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neural flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-neon-cyan/20 p-6 flex flex-col gap-6 sticky top-16 md:h-[calc(100vh-4rem)]">
        <div>
          <h2 className="text-sm font-bold text-gray-500 font-mono tracking-widest mb-4">PLATFORM</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan font-mono text-sm border border-neon-cyan/30">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </Link>
            <Link href="/modules" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 font-mono text-sm transition-colors">
              <Package className="w-4 h-4" /> My Modules
            </Link>
          </nav>
        </div>

        <div className="mt-auto">
          <h2 className="text-sm font-bold text-gray-500 font-mono tracking-widest mb-4">ACCOUNT</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 font-mono text-sm transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 font-mono text-sm transition-colors text-left">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
