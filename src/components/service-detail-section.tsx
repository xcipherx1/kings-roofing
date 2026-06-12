"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    name: "Flat Roof Installations",
    description: "We specialise in modern flat roofing systems that outlast traditional methods by decades.",
    includes: ["Free survey & quote", "Old roof removal", "Insulation upgrade", "New membrane installation", "10-year guarantee"],
    duration: "2–5 days depending on size",
    price: "From £2,500",
  },
  {
    name: "Pitched Roof Repairs",
    description: "Expert repairs for all types of pitched roofs using traditional and modern materials.",
    includes: ["Tile/slate matching", "Valley renewal", "Re-bedding ridge tiles", "Leadwork repairs"],
    duration: "1–3 days",
    price: "From £450",
  },
  {
    name: "Emergency Repairs",
    description: "Our emergency team is on call 24 hours a day, 7 days a week.",
    includes: ["Temporary weatherproofing", "Damage assessment", "Permanent repair", "Insurance documentation"],
    duration: "Same day response",
    price: "Call-out from £180",
  },
  {
    name: "Guttering & Fascias",
    description: "Complete replacement and repair services for guttering, soffits and fascias.",
    includes: ["Full gutter removal", "Fascia board replacement", "Soffit ventilation", "New gutter installation"],
    duration: "1–2 days",
    price: "From £850",
  },
  {
    name: "Roof Inspections",
    description: "Thorough inspections with detailed reports and photographic evidence.",
    includes: ["Visual assessment", "Drone survey (if needed)", "Photographic report", "Written recommendations"],
    duration: "Same day report",
    price: "From £150",
  },
  {
    name: "Chimney Work",
    description: "All aspects of chimney repair and maintenance from repointing to rebuilds.",
    includes: ["Scaffold access", "Repointing", "Flashing replacement", "Cowl installation"],
    duration: "1–2 days",
    price: "From £650",
  },
];

export default function ServiceDetailSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#F5F4F1]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            WHAT WE DO
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Services in Detail
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Click on any service to learn more about what&apos;s included, typical timeframes, and pricing.
          </p>
        </motion.div>

        <div className="max-w-[800px] mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
              className="border-b border-[#E8E6E1]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
              >
                <span className="font-display text-base font-semibold text-[#2C2C2C] group-hover:text-[#3D5A3C] transition-colors">
                  {service.name}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-0 md:pl-4">
                      <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{service.description}</p>
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-2">What&apos;s included:</p>
                        <ul className="space-y-1">
                          {service.includes.map((item) => (
                            <li key={item} className="text-sm text-[#6B6B6B] flex items-start gap-2">
                              <span className="text-[#3D5A3C] mt-0.5">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-medium text-[#D4A574] bg-[rgba(212,165,116,0.15)]">
                          {service.duration}
                        </span>
                        <span className="text-xs font-semibold text-[#3D5A3C]">{service.price}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
