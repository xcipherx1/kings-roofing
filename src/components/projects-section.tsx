"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const filters = ["All", "Flat Roofs", "Pitched Roofs", "Emergency", "Commercial"];

const projects = [
  { title: "Clifton Flat Roof", location: "Clifton, Bristol", image: "/project-clifton.jpg", category: "Flat Roofs" },
  { title: "Bath Stone Roof Restoration", location: "Bath", image: "/project-bath.jpg", category: "Pitched Roofs" },
  { title: "Storm Damage Repair", location: "Redland, Bristol", image: "/project-emergency.jpg", category: "Emergency" },
  { title: "Warehouse Re-Roof", location: "Avonmouth", image: "/project-warehouse.jpg", category: "Commercial" },
  { title: "Modern Guttering System", location: "Southville, Bristol", image: "/project-extension.jpg", category: "Flat Roofs" },
  { title: "Chimney Rebuild", location: "Kingsdown, Bristol", image: "/project-clifton.jpg", category: "Pitched Roofs" },
  { title: "Kitchen Extension Roof", location: "Henleaze, Bristol", image: "/project-extension.jpg", category: "Flat Roofs" },
  { title: "Slate Roof Restoration", location: "Cotham, Bristol", image: "/project-slate.jpg", category: "Pitched Roofs" },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            OUR WORK
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Projects We&apos;ve Completed
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Take a look at some of our recent work across Bristol and the surrounding areas.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f
                  ? "bg-[#3D5A3C] text-white"
                  : "bg-[#F5F4F1] border border-black/[0.08] text-[#2C2C2C] hover:bg-[#E8E6E1]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <span className="text-[11px] text-white/70">{project.location}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
