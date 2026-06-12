"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    "Flat Roof Installation",
    "Pitched Roof Repair",
    "Emergency Repair",
    "Guttering & Fascias",
    "Roof Inspection",
    "Chimney Work",
    "Other",
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden flex items-center" style={{ minHeight: "700px" }}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/roofer-working.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to right, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-24 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column */}
          <motion.div
            className="w-full md:w-[55%] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
              style={{ background: "rgba(61,90,60,0.9)" }}
            >
              <span>Family-Run &middot; 5-Star Rated &middot; 24/7 Emergency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              Expert Roofing Services Across{" "}
              <span className="relative inline-block">
                Bristol &amp; Bath
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-[#3D5A3C]" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
              className="mt-6 text-base lg:text-lg leading-relaxed max-w-[480px]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              From emergency repairs to complete installations, our family team brings 17 years of craftsmanship to every roof we touch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
              className="flex flex-wrap items-center gap-4 lg:gap-6 mt-8 text-sm"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-[#D4A574]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>127 reviews</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="hidden sm:block text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Checkatrade 9.89/10</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65, ease: EASE }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#3D5A3C] hover:bg-[#2E4A2D] text-white text-sm font-semibold rounded-lg transition-all active:scale-[0.98]"
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:01171234567"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 hover:bg-white/10 text-white text-sm font-semibold rounded-lg transition-all"
              >
                <Phone className="w-4 h-4" /> Call 0117 123 4567
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="w-full md:w-[45%]"
          >
            <div
              className="rounded-2xl p-6 lg:p-8"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto text-[#3D5A3C] mb-4" />
                  <h3 className="font-display text-xl font-semibold text-white mb-2">Thank You!</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>We&apos;ll be in touch within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", service: "", message: "", address: "" }); }}
                    className="mt-6 text-sm text-white underline hover:no-underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">Request a Free Quote</h3>
                  <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>We&apos;ll get back to you within 24 hours</p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text" placeholder="Full Name *" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm placeholder:text-[#9B9B9B] border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30"
                    />
                    <input
                      type="email" placeholder="Email Address *" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm placeholder:text-[#9B9B9B] border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30"
                    />
                    <input
                      type="tel" placeholder="Phone Number *" required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm placeholder:text-[#9B9B9B] border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30"
                    />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30 appearance-none"
                    >
                      <option value="">Select Service Required *</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <textarea
                      placeholder="Tell us about your roofing needs..." rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm placeholder:text-[#9B9B9B] border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30 resize-y"
                    />
                    <input
                      type="text" placeholder="Your address (optional)"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/95 text-[#2C2C2C] text-sm placeholder:text-[#9B9B9B] border-0 outline-none focus:ring-2 focus:ring-[#3D5A3C]/30"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#3D5A3C] hover:bg-[#2E4A2D] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all active:scale-[0.98]"
                    >
                      {submitting ? "Sending..." : "Get My Free Quote"} <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Your information is secure. We never share your details.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
