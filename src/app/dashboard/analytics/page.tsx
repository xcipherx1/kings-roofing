"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, TrendingUp, CheckCircle, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3B82F6",
  CONTACTED: "#F59E0B",
  QUOTED: "#8B5CF6",
  IN_PROGRESS: "#F97316",
  COMPLETED: "#10B981",
  LOST: "#6B7280",
  URGENT: "#DC2626",
};

export default function AnalyticsPage() {
  const [data, setData] = useState({
    total: 0,
    byStatus: [] as { status: string; count: number }[],
    byService: [] as { service: string; count: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics", { credentials: "include" })
      .then((r) => r.ok ? r.json() : { total: 0, byStatus: [], byService: [] })
      .then((d: any) => {
        setData({
          total: d.total || 0,
          byStatus: d.byStatus || [],
          byService: d.byService || [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const newCount = data.byStatus.find((s) => s.status === "NEW")?.count || 0;
  const completedCount = data.byStatus.find((s) => s.status === "COMPLETED")?.count || 0;
  const conversionRate = data.total > 0 ? `${Math.round((completedCount / data.total) * 100)}%` : "0%";

  const statCards = [
    { label: "Total Leads", value: data.total, icon: Inbox, change: "+12%", positive: true },
    { label: "New Leads", value: newCount, icon: TrendingUp, change: "+5%", positive: true },
    { label: "Completed", value: completedCount, icon: CheckCircle, change: "+8%", positive: true },
    { label: "Avg Response", value: "2.4h", icon: Clock, change: "-10%", positive: true },
  ];

  const donutSegments = data.byStatus.length > 0
    ? data.byStatus.map((s) => ({ name: s.status, value: s.count, color: STATUS_COLORS[s.status] || "#6B6B6B" }))
    : [];
  const totalDonut = donutSegments.reduce((s, d) => s + d.value, 0) || 1;
  let cumulative = 0;

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="bg-white rounded-xl border border-black/[0.08] p-6"
        >
          <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-6">Status Breakdown</h3>
          {loading ? (
            <div className="h-40 bg-[#F5F4F1] rounded-lg animate-pulse" />
          ) : donutSegments.length === 0 ? (
            <p className="text-sm text-[#6B6B6B] text-center py-8">No data yet</p>
          ) : (
            <div className="flex items-center gap-8">
              <svg viewBox="0 0 100 100" className="w-32 h-32 shrink-0 -rotate-90">
                {donutSegments.map((seg, i) => {
                  const pct = (seg.value / totalDonut) * 100;
                  const dashArray = `${pct} ${100 - pct}`;
                  const dashOffset = -cumulative;
                  cumulative += pct;
                  return (
                    <circle
                      key={i}
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="12"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="28" fill="white" />
              </svg>
              <div className="space-y-2">
                {donutSegments.map((seg) => (
                  <div key={seg.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-xs text-[#6B6B6B]">{seg.name.replace("_", " ")}</span>
                    <span className="text-xs font-medium text-[#2C2C2C]">{seg.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="bg-white rounded-xl border border-black/[0.08] p-6"
        >
          <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-6">Leads by Service</h3>
          {loading ? (
            <div className="h-40 bg-[#F5F4F1] rounded-lg animate-pulse" />
          ) : data.byService.length === 0 ? (
            <p className="text-sm text-[#6B6B6B] text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {data.byService.map((svc) => {
                const maxCount = Math.max(...data.byService.map((s) => s.count), 1);
                return (
                  <div key={svc.service} className="flex items-center gap-4">
                    <span className="text-sm text-[#2C2C2C] w-40 shrink-0 truncate">{svc.service}</span>
                    <div className="flex-1 h-6 bg-[#F5F4F1] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3D5A3C] rounded-full transition-all"
                        style={{ width: `${(svc.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#2C2C2C] w-8 text-right">{svc.count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
