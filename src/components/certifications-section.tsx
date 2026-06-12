"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const bentoItems = [
  {
    span: "col-span-1 md:col-span-2",
    bg: "bg-white",
    content: (
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-red-50 flex items-center justify-center text-2xl font-bold text-red-600 shrink-0">?</div>
        <div>
          <h3 className="font-display text-lg font-semibold text-[#2C2C2C] mb-2">Which? Trusted Trader</h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">We&apos;ve passed Which?&apos;s rigorous assessment process, including credit checks, customer satisfaction, and business practices.</p>
        </div>
      </div>
    ),
  },
  {
    span: "col-span-1",
    bg: "bg-white",
    content: (
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-lg bg-green-50 flex items-center justify-center text-3xl mb-3">&#10003;</div>
        <div className="font-display text-4xl font-semibold text-[#3D5A3C] mb-1">9.89<span className="text-xl">/10</span></div>
        <p className="text-sm text-[#6B6B6B]">Average rating on Checkatrade</p>
      </div>
    ),
  },
  {
    span: "col-span-1",
    bg: "bg-white",
    content: (
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-lg bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 mb-3">TM</div>
        <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-1">Government Endorsed Quality</h3>
        <p className="text-sm text-[#6B6B6B]">Every job backed by quality assurance</p>
      </div>
    ),
  },
  {
    span: "col-span-1 md:col-span-2",
    bg: "bg-[#3D5A3C]",
    content: (
      <div className="text-white">
        <h3 className="font-display text-xl font-semibold mb-3">10-Year Workmanship Guarantee</h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
          Every installation comes with our comprehensive 10-year guarantee. If anything goes wrong, we&apos;ll fix it — no questions asked.
        </p>
        <a href="#services" className="inline-block mt-4 text-sm underline hover:no-underline">Learn more &rarr;</a>
      </div>
    ),
  },
  {
    span: "col-span-1",
    bg: "bg-white",
    content: (
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600 mb-3">NFRC</div>
        <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-1">National Federation of Roofing Contractors</h3>
        <p className="text-sm text-[#6B6B6B]">Member since 2010</p>
      </div>
    ),
  },
  {
    span: "col-span-1",
    bg: "bg-white",
    content: (
      <div className="text-center">
        <div className="font-display text-5xl font-semibold text-[#6A7B69] mb-2">500+</div>
        <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-1">Roofs Completed</h3>
        <p className="text-sm text-[#6B6B6B]">Across Bristol &amp; Bath</p>
      </div>
    ),
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 md:py-20 lg:py-24 bg-[#F5F4F1]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            CERTIFIED &amp; ACCREDITED
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            We&apos;re proud to hold the highest certifications in the roofing industry, giving you complete peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className={`${item.span} ${item.bg} rounded-xl p-6 border border-black/[0.08] hover:border-black/[0.15] hover:shadow-lg transition-all`}
            >
              {item.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
