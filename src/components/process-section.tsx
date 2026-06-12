"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Hammer, CheckCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  { number: "01", icon: PhoneCall, title: "Get in Touch", description: "Call us, fill in our form, or send an email. We'll arrange a convenient time to visit.", duration: "Same day response" },
  { number: "02", icon: ClipboardList, title: "Free Survey & Quote", description: "We'll inspect your roof, take photos, and provide a detailed, fixed-price quote within 24 hours.", duration: "24-hour quote" },
  { number: "03", icon: Hammer, title: "Expert Installation", description: "Our team arrives on the agreed date, completes the work to the highest standard, and cleans up daily.", duration: "1–5 days" },
  { number: "04", icon: CheckCircle, title: "Sign-Off & Guarantee", description: "We walk you through the completed work, provide documentation, and activate your 10-year guarantee.", duration: "Lifetime support" },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#F5F4F1]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            HOW WE WORK
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Our Simple 4-Step Process
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            From first contact to final sign-off, we make getting a new roof as straightforward as possible.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-[#E8E6E1]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(106,123,105,0.15)] mb-5">
                  <span className="font-display text-lg font-semibold text-[#3D5A3C]">{step.number}</span>
                </div>
                <div className="w-10 h-10 mx-auto rounded-full bg-[rgba(106,123,105,0.15)] flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#6A7B69]" />
                </div>
                <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{step.description}</p>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium text-[#D4A574] bg-[rgba(212,165,116,0.15)]">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
