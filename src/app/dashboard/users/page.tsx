"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Plus, Shield, UserCircle, X, AlertTriangle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "STAFF" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.user?.role !== "ADMIN") {
          router.push("/dashboard");
          return;
        }
        setIsAdmin(true);
        fetchUsers();
      })
      .catch(() => router.push("/dashboard"));
  }, [router]);

   const fetchUsers = () => {
    fetch("/api/users", { credentials: "include" })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const userList = Array.isArray(data) ? data : (data.users || []);
        setUsers(userList);
        setLoading(false);
      });
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        setShowAdd(false);
        setFormData({ name: "", email: "", password: "", role: "STAFF" });
        fetchUsers();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const updateRole = async (id: string, role: string) => {
    await fetch(`/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
      credentials: "include",
    });
    fetchUsers();
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#3D5A3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-[#2C2C2C]">Users</h2>
          <p className="text-sm text-[#6B6B6B]">Manage staff and admin accounts</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3D5A3C] text-white text-sm font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-white rounded-xl border border-black/[0.08] overflow-hidden"
      >
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-[#F5F4F1] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto text-[#E8E6E1] mb-3" />
            <p className="text-sm text-[#6B6B6B]">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F4F1] text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">User</th>
                  <th className="px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Joined</th>
                  <th className="px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F5F4F1]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#3D5A3C] flex items-center justify-center text-white text-sm font-semibold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-[#2C2C2C]">{u.name}</div>
                          <div className="text-xs text-[#6B6B6B]">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.role === "ADMIN" ? "bg-[#3D5A3C]/10 text-[#3D5A3C]" : "bg-[#6A7B69]/10 text-[#6A7B69]"
                      }`}>
                        {u.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <UserCircle className="w-3 h-3" />}
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#9B9B9B]">
                      {new Date(u.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => updateRole(u.id, e.target.value)}
                        className="px-2 py-1 bg-white border border-black/[0.08] rounded-lg text-xs outline-none"
                      >
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAdd(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-semibold text-[#2C2C2C]">Add New User</h3>
              <button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-[#F5F4F1] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[#6B6B6B]" />
              </button>
            </div>
            <form onSubmit={addUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Full Name</label>
                <input
                  type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Email</label>
                <input
                  type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Password</label>
                <input
                  type="password" required value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
                  placeholder="Min 6 characters"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
                >
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#3D5A3C] text-white text-sm font-semibold rounded-lg hover:bg-[#2E4A2D] disabled:opacity-60 transition-all"
              >
                {submitting ? "Creating..." : "Create User"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
