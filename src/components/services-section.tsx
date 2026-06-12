"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = ["All", "Residential", "Commercial", "Emergency"];

const services = [
  {
    title: "Flat Roof Installations",
    description: "Specialist flat roofing using EPDM rubber, GRP fibreglass, and high-performance felt systems.",
    image: "/service-flat-roof.jpg",
    tags: ["EPDM", "GRP", "Felt", "Commercial"],
    category: "Commercial",
    tall: true,
  },
  {
    title: "Pitched Roof Repairs",
    description: "Tile replacement, slate work, re-bedding, and valley repairs for all roof types.",
    image: "/service-pitched-roof.jpg",
    tags: ["Tiles", "Slates", "Valleys"],
    category: "Residential",
    tall: false,
  },
  {
    title: "24/7 Emergency Repairs",
    description: "Rapid response for leaks, storm damage, and urgent roofing issues.",
    image: "/service-emergency.jpg",
    tags: ["24/7", "Storm Damage", "Leaks"],
    category: "Emergency",
    tall: false,
    accent: true,
  },
  {
    title: "Guttering & Fascias",
    description: "Complete gutter replacement, soffits, fascias, and downpipe installations.",
    image: "/service-guttering.jpg",
    tags: ["uPVC", "Aluminium", "Cast Iron"],
    category: "Residential",
    tall: false,
  },
  {
    title: "Roof Inspections",
    description: "Detailed condition reports with photographic evidence and repair recommendations.",
    image: "/service-inspection.jpg",
    tags: ["Drone Survey", "Reports"],
    category: "Residential",
    tall: false,
  },
  {
    title: "Chimney Work",
    description: "Repointing, capping, leadwork, and full chimney rebuilds.",
    image: "/service-chimney.jpg",
    tags: ["Repointing", "Leadwork"],
    category: "Residential",
    tall: false,
  },
];

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? services : services.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            OUR SERVICES
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Complete Roofing Solutions
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            From minor repairs to complete installations, we handle every aspect of residential and commercial roofing.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === cat
                  ? "bg-[#3D5A3C] text-white"
                  : "bg-white border border-black/[0.08] text-[#2C2C2C] hover:bg-[#F5F4F1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className={`group bg-white rounded-xl border border-black/[0.08] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all ${
                  service.tall ? "md:row-span-2" : ""
                } ${service.accent ? "border-l-[3px] border-l-[#DC2626]" : ""}`}
              >
                <div className={`relative overflow-hidden ${service.tall ? "aspect-[16/12]" : "aspect-[16/10]"}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-400"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-[#6A7B69] bg-[rgba(106,123,105,0.15)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#3D5A3C] hover:underline cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
