"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Inbox, BarChart3, Users, Settings,
  LogOut, Menu, X, Bell, Search, Plus,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Inbox, label: "Leads", href: "/dashboard/leads" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  const isAdmin = user?.role === "ADMIN";

  const filteredNav = isAdmin ? navItems : navItems.filter((n) => n.href === "/dashboard" || n.href === "/dashboard/leads" || n.href === "/dashboard/settings");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#3D5A3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F4F1] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#3A3A3A] text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="font-display text-lg font-semibold mb-0.5">Kings Roofs</div>
          <div className="text-[10px] font-medium tracking-wider text-white/50">BRISTOL LTD</div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[rgba(61,90,60,0.3)] text-white border-l-[3px] border-[#3D5A3C]"
                    : "text-white/70 hover:bg-white/[0.08] border-l-[3px] border-transparent"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-[#3D5A3C]" : "text-white/50"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#3D5A3C] flex items-center justify-center text-xs font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-white/50 capitalize">{user.role.toLowerCase()}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-black/[0.08] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#F5F4F1] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-[#2C2C2C]" />
            </button>
            <h1 className="font-display text-base font-semibold text-[#2C2C2C]">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-[#F5F4F1] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[#6B6B6B]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-[#3D5A3C] text-white text-xs font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Lead
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
