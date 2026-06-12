"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-[420px] bg-white rounded-2xl border border-black/[0.08] p-8 md:p-10 shadow-sm"
      >
        <div className="text-center mb-6">
          <div className="font-display text-xl font-semibold text-[#2C2C2C] mb-1">Kings Roofs</div>
          <div className="text-[10px] font-medium tracking-wider text-[#6B6B6B]">BRISTOL LTD</div>
        </div>

        <h1 className="font-display text-xl md:text-2xl font-semibold text-[#2C2C2C] text-center mb-1">
          Staff Login
        </h1>
        <p className="text-sm text-[#6B6B6B] text-center mb-6">
          Access the lead management dashboard
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#E8E6E1] text-sm text-[#2C2C2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#6A7B69] focus:ring-2 focus:ring-[rgba(106,123,105,0.15)] transition-all"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#E8E6E1] text-sm text-[#2C2C2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#6A7B69] focus:ring-2 focus:ring-[rgba(106,123,105,0.15)] transition-all"
              placeholder="•••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#3D5A3C] hover:bg-[#2E4A2D] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <a href="/" className="block text-center text-sm text-[#6B6B6B] hover:text-[#2C2C2C] mt-6 transition-colors">
          ← Back to website
        </a>
      </motion.div>
    </div>
  );
}
