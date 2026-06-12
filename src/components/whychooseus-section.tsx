"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Clock, Sparkles, BadgeCheck, Banknote, Phone } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const usps = [
  { icon: Users, title: "Family-Run, Not Faceless", description: "You'll deal directly with the owners, not a call centre. We know every customer by name." },
  { icon: ShieldCheck, title: "10-Year Guarantee on All Work", description: "Every installation and major repair is backed by our industry-leading 10-year workmanship guarantee." },
  { icon: Clock, title: "On-Time, Every Time", description: "We give you a specific start date and stick to it. 98% of our projects finish on or ahead of schedule." },
  { icon: Sparkles, title: "We Leave It Cleaner Than We Found It", description: "Daily clean-up is standard. Your garden and driveway will be spotless when we leave." },
  { icon: BadgeCheck, title: "No Subcontractors — Ever", description: "Our roofers are direct employees, fully trained and vetted. We never pass your job to a third party." },
  { icon: Banknote, title: "Transparent Pricing", description: "Fixed-price quotes with no hidden extras. If we find additional work needed, we discuss it first." },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            The Kings Roofs Difference
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            We&apos;re not just another roofing company. Here&apos;s what sets us apart.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* USP List */}
          <div className="w-full lg:w-[60%] space-y-3">
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-4 p-4 md:p-5 bg-[#F5F4F1] rounded-xl border border-black/[0.08]"
              >
                <div className="w-10 h-10 rounded-full bg-[rgba(106,123,105,0.15)] flex items-center justify-center shrink-0">
                  <usp.icon className="w-5 h-5 text-[#6A7B69]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-[#2C2C2C] mb-1">{usp.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{usp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full lg:w-[40%]"
          >
            <div
              className="sticky top-24 rounded-2xl p-6 lg:p-8 text-white"
              style={{ background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)" }}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">24/7 Emergency Response</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
                Roof leaking? Storm damage? Don&apos;t wait. Our emergency team is ready to secure your property any time, day or night.
              </p>
              <a
                href="tel:01171234567"
                className="inline-flex items-center gap-2 text-2xl md:text-3xl font-display font-semibold text-white mb-4 hover:underline"
              >
                <Phone className="w-6 h-6" /> 0117 123 4567
              </a>
              <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 inline-block mb-5">
                Average response: 2 hours
              </div>
              <a
                href="tel:01171234567"
                className="block w-full text-center py-3.5 bg-white text-[#DC2626] font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
