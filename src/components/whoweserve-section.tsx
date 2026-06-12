"use client";

import { motion } from "framer-motion";
import { Home, Building2, Warehouse, HardHat } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const customers = [
  { icon: Home, title: "Homeowners", description: "From minor repairs to complete re-roofs, we treat your home like it's our own.", examples: "Terraced houses, semi-detached, bungalows" },
  { icon: Building2, title: "Landlords & Property Managers", description: "Reliable service with detailed reports and invoices for your records.", examples: "Rental portfolios, HMOs, estate agents" },
  { icon: Warehouse, title: "Commercial Clients", description: "Large-scale installations with minimal disruption to your business operations.", examples: "Warehouses, offices, retail units" },
  { icon: HardHat, title: "Builders & Developers", description: "Partner with us for new-build roofing on your construction projects.", examples: "Housing developments, extensions, conversions" },
];

export default function WhoWeServeSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            WHO WE HELP
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Roofing Services For Everyone
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Whether you&apos;re a homeowner, landlord, or business owner, we have the expertise you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {customers.map((customer, i) => (
            <motion.div
              key={customer.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="text-center p-6 bg-[#F5F4F1] rounded-xl border border-black/[0.08] hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[rgba(106,123,105,0.15)] flex items-center justify-center mb-4">
                <customer.icon className="w-7 h-7 text-[#6A7B69]" />
              </div>
              <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-2">{customer.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{customer.description}</p>
              <p className="text-xs text-[#6B6B6B] italic">e.g., {customer.examples}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
