"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const partners = ["Which?", "Checkatrade", "TrustMark", "NFRC", "Google", "Velux", "Redland", "Marley"];

export default function PartnersSection() {
  return (
    <section className="py-10 bg-[#F5F4F1] border-y border-[#E8E6E1] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl md:text-2xl font-display font-semibold text-[#6B6B6B]/50 hover:text-[#6B6B6B]/80 transition-colors select-none shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
