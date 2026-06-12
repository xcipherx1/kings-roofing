"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const areas = [
  "Bristol", "Bath", "Kingswood", "Hanham", "Longwell Green", "Warmley", "Keynsham", "Saltford",
  "Midsomer Norton", "Radstock", "Chew Valley", "Thornbury", "Yate", "Chipping Sodbury",
  "Almondsbury", "Patchway", "Filton", "Stoke Gifford", "Bradley Stoke", "Emersons Green",
];

export default function ServiceAreasSection() {
  return (
    <section id="areas" className="py-16 md:py-20 lg:py-24 bg-[#F5F4F1]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            AREAS WE COVER
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Serving Bristol, Bath &amp; Beyond
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Based in Kingswood, we cover all of Bristol, Bath, and surrounding towns within a 25-mile radius.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full lg:w-[55%]"
          >
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#E8E6E1]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.7!2d-2.505!3d51.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI3JzM2LjAiTiAywrAzMCcxOC4wIlc!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kings Roofs Bristol coverage area"
              />
            </div>
          </motion.div>

          {/* Area List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full lg:w-[45%]"
          >
            <h3 className="font-display text-lg font-semibold text-[#2C2C2C] mb-4">Primary Areas</h3>
            <div className="flex flex-wrap gap-2">
              {areas.map((area, i) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-black/[0.08] text-[#2C2C2C] hover:bg-[#3D5A3C] hover:text-white transition-colors cursor-default"
                >
                  {area}
                </motion.span>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#6B6B6B]">
              Don&apos;t see your area? We cover all locations within 25 miles of Bristol. Give us a call to confirm.
            </p>
            <a href="tel:01171234567" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-[#3D5A3C] hover:underline">
              <Phone className="w-4 h-4" /> 0117 123 4567
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
