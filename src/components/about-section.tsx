"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
  { value: "17+", label: "Years Experience" },
  { value: "500+", label: "Roofs Completed" },
  { value: "98%", label: "Customer Satisfaction" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image src="/about-team.jpg" alt="Kings Roofs Bristol team" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
              ABOUT US
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight leading-tight">
              A Family Business Built on Trust &amp; Quality
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#2C2C2C]">
              For over 17 years, Kings Roofs Bristol has been the name homeowners and businesses trust across the South West. What started as a father-and-son team has grown into a full-service roofing company — but we&apos;ve never lost that family touch.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B]">
              Every member of our team is fully qualified, insured, and trained to the highest standards. We don&apos;t subcontract — our roofers are our family.
            </p>

            <div className="flex items-center gap-8 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: EASE }}
                  className="text-center"
                >
                  <div className="font-display text-2xl md:text-3xl font-semibold text-[#3D5A3C]">{stat.value}</div>
                  <div className="text-xs text-[#6B6B6B] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
