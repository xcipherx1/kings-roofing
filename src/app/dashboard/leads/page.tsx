"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Download, MoreVertical, Phone, Mail,
  ChevronLeft, ChevronRight, CheckCircle, X,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  QUOTED: "bg-purple-100 text-purple-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-green-100 text-green-700",
  LOST: "bg-gray-100 text-gray-700",
  URGENT: "bg-red-100 text-red-700",
};

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  status: string;
  address: string | null;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<{ id: string; content: string; createdAt: string; author: { name: string } }[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const perPage = 10;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(perPage));
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/leads?${params}`, { credentials: "include" });
      const data = await res.json();
      setLeads(data.items || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, debouncedSearch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    fetchLeads();
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE", credentials: "include" });
    setDetailOpen(false);
    setSelectedLead(null);
    fetchLeads();
  };

  const fetchNotes = async (id: string) => {
    const res = await fetch(`/api/leads/${id}`, { credentials: "include" });
    const data = await res.json();
    setNotes(data.notes || []);
  };

  const addNote = async () => {
    if (!selectedLead || !noteContent.trim()) return;
    await fetch(`/api/leads/${selectedLead.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: noteContent }),
      credentials: "include",
    });
    setNoteContent("");
    fetchNotes(selectedLead.id);
  };

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
    fetchNotes(lead.id);
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9B9B]" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69] focus:ring-2 focus:ring-[rgba(106,123,105,0.15)]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 bg-white border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
        >
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUOTED">Quoted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="URGENT">Urgent</option>
        </select>
        <button
          onClick={() => {
            const csv = leads.map(l => `${l.name},${l.email},${l.phone},${l.status},${l.service || ""},${new Date(l.createdAt).toLocaleDateString()}`).join("\n");
            const blob = new Blob([`Name,Email,Phone,Status,Service,Date\n${csv}`], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "leads.csv"; a.click();
          }}
          className="inline-flex items-center gap-2 px-3 py-2.5 bg-white border border-black/[0.08] rounded-lg text-sm text-[#2C2C2C] hover:bg-[#F5F4F1] transition-colors"
        >
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl border border-black/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F4F1] text-left">
                <th className="px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={5} className="px-4 py-4"><div className="h-4 bg-[#F5F4F1] rounded animate-pulse" /></td></tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#6B6B6B]">No leads found</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F5F4F1]/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-[#2C2C2C]">{lead.name}</div>
                      <div className="text-xs text-[#6B6B6B]">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B6B6B]">{lead.service || "General"}</td>
                    <td className="px-4 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-[10px] font-medium border-0 cursor-pointer ${statusColors[lead.status] || ""}`}
                      >
                        {Object.keys(statusColors).map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#9B9B9B] hidden md:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => openDetail(lead)}
                        className="p-1.5 hover:bg-[#F5F4F1] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[#6B6B6B]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-black/[0.08] flex items-center justify-between">
            <span className="text-xs text-[#6B6B6B]">Showing {Math.min((page - 1) * perPage + 1, total)}-{Math.min(page * perPage, total)} of {total}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-[#F5F4F1] disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const p = i + 1;
                return (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#3D5A3C] text-white" : "hover:bg-[#F5F4F1]"}`}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-[#F5F4F1] disabled:opacity-40 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {detailOpen && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setDetailOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-[480px] bg-white h-full overflow-y-auto shadow-xl"
            >
              <div className="sticky top-0 bg-white border-b border-black/[0.08] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="font-display text-base font-semibold text-[#2C2C2C]">Lead Details</h2>
                  <span className="text-xs text-[#9B9B9B]">{new Date(selectedLead.createdAt).toLocaleDateString("en-GB")}</span>
                </div>
                <button onClick={() => setDetailOpen(false)} className="p-2 hover:bg-[#F5F4F1] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#6B6B6B]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#2C2C2C] mb-3">{selectedLead.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#6B6B6B]"><Mail className="w-4 h-4" /> {selectedLead.email}</div>
                    <div className="flex items-center gap-2 text-[#6B6B6B]"><Phone className="w-4 h-4" /> {selectedLead.phone}</div>
                    {selectedLead.address && <div className="text-[#6B6B6B]">{selectedLead.address}</div>}
                  </div>
                  <div className="mt-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedLead.status] || ""}`}>
                      {selectedLead.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#6B6B6B] mb-2 block">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(statusColors).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedLead.status === s ? statusColors[s] : "bg-[#F5F4F1] text-[#6B6B6B] hover:bg-[#E8E6E1]"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-sm font-semibold text-[#2C2C2C] mb-3">Notes & Activity</h4>
                  <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                    {notes.length === 0 ? (
                      <p className="text-xs text-[#9B9B9B]">No notes yet</p>
                    ) : (
                      notes.map((note) => (
                        <div key={note.id} className="p-3 bg-[#F5F4F1] rounded-lg">
                          <p className="text-sm text-[#2C2C2C]">{note.content}</p>
                          <div className="text-[10px] text-[#9B9B9B] mt-1">{note.author?.name || "Staff"} &middot; {new Date(note.createdAt).toLocaleDateString("en-GB")}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-2 bg-white border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
                      onKeyDown={(e) => e.key === "Enter" && addNote()}
                    />
                    <button onClick={addNote} className="px-4 py-2 bg-[#3D5A3C] text-white text-xs font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors">
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-black/[0.08]">
                  <button
                    onClick={() => updateStatus(selectedLead.id, "COMPLETED")}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#3D5A3C] text-white text-sm font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as Completed
                  </button>
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="w-full py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
