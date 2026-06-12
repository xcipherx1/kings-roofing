"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Inbox, TrendingUp, Clock, CheckCircle, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads?page=1&limit=5", { credentials: "include" })
      .then((r) => r.ok ? r.json() : { items: [], total: 0 })
      .then((data) => {
        setLeads(data.items || []);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  }, []);

  const newThisWeek = leads.filter((l) => l.status === "NEW").length;
  const completed = leads.filter((l) => l.status === "COMPLETED").length;
  const conversionRate = total > 0 ? `${Math.round((completed / total) * 100)}%` : "0%";

  const statCards = [
    { label: "Total Leads", value: total, icon: Inbox, change: "+12%", positive: true },
    { label: "New This Week", value: newThisWeek, icon: TrendingUp, change: "+5%", positive: true },
    { label: "Conversion Rate", value: conversionRate, icon: CheckCircle, change: "+2%", positive: true },
    { label: "Avg. Response", value: "2.4h", icon: Clock, change: "-10%", positive: true },
  ];

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-amber-100 text-amber-700",
    QUOTED: "bg-purple-100 text-purple-700",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    COMPLETED: "bg-green-100 text-green-700",
    LOST: "bg-gray-100 text-gray-700",
    URGENT: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
            className="bg-white rounded-xl border border-black/[0.08] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-[#6B6B6B]" />
              <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.positive ? "text-[#3D5A3C]" : "text-red-600"}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="font-display text-2xl font-semibold text-[#2C2C2C]">{stat.value}</div>
            <div className="text-xs text-[#6B6B6B] mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="bg-white rounded-xl border border-black/[0.08] overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-[#2C2C2C]">Recent Leads</h2>
          <Link href="/dashboard/leads" className="text-xs font-medium text-[#3D5A3C] hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-[#F5F4F1] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto text-[#E8E6E1] mb-3" />
            <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-1">No leads yet</h3>
            <p className="text-sm text-[#6B6B6B]">Leads from your website will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {leads.map((lead) => (
              <div key={lead.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[#F5F4F1]/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#2C2C2C] truncate">{lead.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">{lead.service || "General Enquiry"} &middot; {lead.email}</div>
                </div>
                <div className="text-xs text-[#9B9B9B] shrink-0">
                  {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
