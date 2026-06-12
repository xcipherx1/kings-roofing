"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, TrendingUp, CheckCircle, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AnalyticsPage() {
  const [data, setData] = useState({
    totalLeads: 0, newLeads: 0, contacted: 0, quoted: 0, inProgress: 0, completed: 0, lost: 0, urgent: 0,
    weeklyLeads: [] as number[], statusBreakdown: [] as { name: string; value: number; color: string }[],
    serviceBreakdown: [] as { name: string; count: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics", { credentials: "include" })
      .then((r) => r.ok ? r.json() : {})
      .then((d: any) => {
        setData({
          totalLeads: d.totalLeads || 0,
          newLeads: d.newLeads || 0,
          contacted: d.contacted || 0,
          quoted: d.quoted || 0,
          inProgress: d.inProgress || 0,
          completed: d.completed || 0,
          lost: d.lost || 0,
          urgent: d.urgent || 0,
          weeklyLeads: d.weeklyLeads || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          statusBreakdown: d.statusBreakdown || [],
          serviceBreakdown: d.serviceBreakdown || [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Leads", value: data.totalLeads, icon: Inbox, change: "+12%", positive: true },
    { label: "New Leads", value: data.newLeads, icon: TrendingUp, change: "+5%", positive: true },
    { label: "Completed", value: data.completed, icon: CheckCircle, change: "+8%", positive: true },
    { label: "Avg Response", value: "2.4h", icon: Clock, change: "-10%", positive: true },
  ];

  const maxWeekly = Math.max(...data.weeklyLeads, 1);

  const donutSegments = data.statusBreakdown.length > 0 ? data.statusBreakdown : [
    { name: "NEW", value: 1, color: "#3B82F6" },
    { name: "CONTACTED", value: 1, color: "#F59E0B" },
    { name: "COMPLETED", value: 1, color: "#10B981" },
  ];
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
        {/* Lead Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="bg-white rounded-xl border border-black/[0.08] p-6"
        >
          <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-6">Lead Volume (Last 12 Weeks)</h3>
          {loading ? (
            <div className="h-40 bg-[#F5F4F1] rounded-lg animate-pulse" />
          ) : (
            <div className="flex items-end gap-2 h-40">
              {data.weeklyLeads.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-[#3D5A3C] transition-all hover:bg-[#2E4A2D]"
                    style={{ height: `${(val / maxWeekly) * 100}%`, minHeight: val > 0 ? "4px" : "0" }}
                    title={`Week ${i + 1}: ${val} leads`}
                  />
                  <span className="text-[9px] text-[#9B9B9B]">W{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="bg-white rounded-xl border border-black/[0.08] p-6"
        >
          <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-6">Status Breakdown</h3>
          {loading ? (
            <div className="h-40 bg-[#F5F4F1] rounded-lg animate-pulse" />
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
                      className="transition-all"
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
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="bg-white rounded-xl border border-black/[0.08] p-6 lg:col-span-2"
        >
          <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-6">Leads by Service</h3>
          {loading ? (
            <div className="h-32 bg-[#F5F4F1] rounded-lg animate-pulse" />
          ) : data.serviceBreakdown.length === 0 ? (
            <p className="text-sm text-[#6B6B6B] text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {data.serviceBreakdown.map((svc) => {
                const maxCount = Math.max(...data.serviceBreakdown.map((s) => s.count), 1);
                return (
                  <div key={svc.name} className="flex items-center gap-4">
                    <span className="text-sm text-[#2C2C2C] w-40 shrink-0 truncate">{svc.name}</span>
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
