"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTASection() {
  return (
    <section id="quote" className="py-16 md:py-20 lg:py-24 bg-[#3D5A3C]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white bg-white/15 mb-5">
            READY TO START?
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-semibold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Get Your Free, No-Obligation Quote Today
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed max-w-[600px] mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
            Join over 500 happy customers across Bristol and Bath. It takes 2 minutes to request a quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#home"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#3D5A3C] font-semibold text-sm rounded-lg hover:bg-white/90 transition-all active:scale-[0.98]"
            >
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:01171234567"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" /> Call 0117 123 4567
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            ✓ Free survey ✓ Fixed price quote ✓ No obligation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
