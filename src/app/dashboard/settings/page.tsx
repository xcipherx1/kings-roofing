"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell as BellIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SettingsPage() {
  const [passwordData, setPasswordData] = useState({ current: "", newPass: "", confirm: "" });
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPass !== passwordData.confirm) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("Password updated successfully");
    setPasswordData({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-[#2C2C2C]">Settings</h2>
        <p className="text-sm text-[#6B6B6B]">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-white rounded-xl border border-black/[0.08] p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <User className="w-5 h-5 text-[#6B6B6B]" />
          <h3 className="font-display text-base font-semibold text-[#2C2C2C]">Profile Information</h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#3D5A3C] flex items-center justify-center text-white text-xl font-semibold">
            S
          </div>
          <div>
            <div className="font-medium text-[#2C2C2C]">Staff User</div>
            <div className="text-sm text-[#6B6B6B]">staff@kingsroofsbristol.co.uk</div>
          </div>
        </div>
      </motion.div>

      {/* Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="bg-white rounded-xl border border-black/[0.08] p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Lock className="w-5 h-5 text-[#6B6B6B]" />
          <h3 className="font-display text-base font-semibold text-[#2C2C2C]">Change Password</h3>
        </div>

        {message && (
          <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Current Password</label>
            <input
              type="password" required value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">New Password</label>
            <input
              type="password" required value={passwordData.newPass}
              onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
              className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1.5">Confirm New Password</label>
            <input
              type="password" required value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              className="w-full px-4 py-2.5 border border-black/[0.08] rounded-lg text-sm outline-none focus:border-[#6A7B69]"
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-[#3D5A3C] text-white text-sm font-medium rounded-lg hover:bg-[#2E4A2D] transition-colors">
            Update Password
          </button>
        </form>
      </motion.div>
    </div>
  );
}
