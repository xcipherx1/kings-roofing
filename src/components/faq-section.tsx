"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    q: "How much does a new roof cost?",
    a: "Every roof is different, but as a guide, a typical 3-bedroom semi-detached house re-roof costs between £5,000 and £8,000. Flat roofs start from £2,500. We provide fixed-price quotes after a free survey, so there are no surprises.",
  },
  {
    q: "How long will the work take?",
    a: "Most repairs are completed in 1–2 days. A full re-roof typically takes 3–5 days. We'll give you a clear timeline in your quote and keep you updated throughout.",
  },
  {
    q: "Do you offer emergency services?",
    a: "Yes — we have a dedicated 24/7 emergency line for urgent issues like leaks and storm damage. Call 0117 123 4567 any time, and we'll aim to be with you within 2 hours.",
  },
  {
    q: "Are you insured?",
    a: "Absolutely. We carry full public liability insurance (£5M) and employer's liability insurance. Certificates available on request.",
  },
  {
    q: "What areas do you cover?",
    a: "We're based in Kingswood, Bristol, and cover all of Bristol, Bath, and surrounding areas within a 25-mile radius. This includes North Somerset, South Gloucestershire, and parts of Wiltshire.",
  },
  {
    q: "Do I need to be home during the work?",
    a: "Not necessarily. As long as we have access to the property and a contact number, you can go about your day. We'll keep you updated via text or phone.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            FAQ
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Common Questions
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Everything you need to know about our roofing services.
          </p>
        </motion.div>

        <div className="max-w-[800px] mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
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
                <span className="text-sm md:text-base font-medium text-[#2C2C2C] group-hover:text-[#3D5A3C] transition-colors pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="shrink-0"
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
                    <p className="pb-5 text-sm text-[#6B6B6B] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="tel:01171234567"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/[0.08] text-[#2C2C2C] text-sm font-medium rounded-lg hover:bg-[#F5F4F1] transition-colors"
          >
            <Phone className="w-4 h-4" /> Still have questions? Call us on 0117 123 4567
          </a>
        </div>
      </div>
    </section>
  );
}
