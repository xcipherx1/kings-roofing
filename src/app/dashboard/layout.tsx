"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Inbox, BarChart3, Users, Settings,
  LogOut, Menu, X, Bell, Plus,
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
  const [notifOpen, setNotifOpen] = useState(false);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", service: "", message: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [notifs, setNotifs] = useState<{ id: string; text: string; date: string }[]>([]);

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

  useEffect(() => {
    fetch("/api/leads?page=1&limit=5", { credentials: "include" })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = data.items || [];
        setNotifs(items.slice(0, 5).map((l: any, i: number) => ({
          id: l.id || String(i),
          text: `New lead from ${l.name} - ${l.service || "General"}`,
          date: new Date(l.createdAt).toLocaleDateString("en-GB"),
        })));
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  const handleNewLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.phone) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });
      if (res.ok) {
        setLeadForm({ name: "", email: "", phone: "", service: "", message: "", address: "" });
        setNewLeadOpen(false);
        window.location.reload();
      }
    } finally {
      setSubmitting(false);
    }
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
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

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

      <div className="flex-1 min-w-0">
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
          <div className="flex items-center gap-3 relative">
            {/* Bell with dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 hover:bg-[#F5F4F1] rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-[#6B6B6B]" />
                {notifs.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-black/[0.08] shadow-lg z-50 py-2">
                  <div className="px-4 py-2 border-b border-black/[0.08] font-medium text-sm">Notifications</div>
                  {notifs.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-[#6B6B6B]">No notifications</div>
                  ) : (
                    notifs.map((n) => (
                      <div key={n.id} className="px-4 py-2 hover:bg-[#F5F4F1] text-xs text-[#2C2C2C]">
                        {n.text} <span className="text-[#9B9B9B] ml-1">{n.date}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setNewLeadOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-[#3D5A3C] text-white text-xs font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Lead
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* New Lead Modal */}
      <AnimatePresence>
        {newLeadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setNewLeadOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-[#2C2C2C]">Add New Lead</h3>
                <button onClick={() => setNewLeadOpen(false)} className="p-1.5 hover:bg-[#F5F4F1] rounded-lg">
                  <X className="w-5 h-5 text-[#6B6B6B]" />
                </button>
              </div>
              <form onSubmit={handleNewLead} className="space-y-3">
                <input type="text" placeholder="Full Name *" required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]" />
                <input type="email" placeholder="Email *" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]" />
                <input type="tel" placeholder="Phone *" required value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]" />
                <select value={leadForm.service} onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]">
                  <option value="">Select Service</option>
                  <option>Flat Roof Installation</option>
                  <option>Pitched Roof Repair</option>
                  <option>Emergency Repair</option>
                  <option>Guttering & Fascias</option>
                  <option>Roof Inspection</option>
                  <option>Chimney Work</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Message" value={leadForm.message} onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69] resize-y min-h-[60px]" />
                <input type="text" placeholder="Address" value={leadForm.address} onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })} className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]" />
                <button type="submit" disabled={submitting} className="w-full py-3 bg-[#3D5A3C] text-white text-sm font-semibold rounded-lg hover:bg-[#2E4A2D] disabled:opacity-60 transition-all">
                  {submitting ? "Adding..." : "Add Lead"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
