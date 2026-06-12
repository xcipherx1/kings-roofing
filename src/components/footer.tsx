"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const serviceLinks = ["Flat Roof Installations", "Pitched Roof Repairs", "Emergency Repairs", "Guttering & Fascias", "Roof Inspections", "Chimney Work"];
const companyLinks = ["About Us", "Our Process", "Service Areas", "Reviews", "Careers", "Blog"];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="bg-[#3A3A3A] text-white"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Company */}
          <div>
            <div className="mb-4">
              <span className="font-display text-xl font-semibold text-white">Kings Roofs</span>
              <span className="block text-[10px] font-medium tracking-wider text-white/60">BRISTOL LTD</span>
            </div>
            <p className="text-sm text-[#E8E6E1] leading-relaxed mb-5">
              Family-run roofing specialists serving Bristol &amp; Bath since 2008.
            </p>
            <div className="flex items-center gap-3">
              {["FB", "IG", "X", "LI"].map((social) => (
                <span
                  key={social}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white hover:bg-[#3D5A3C] hover:border-[#3D5A3C] transition-all cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm text-[#E8E6E1] hover:text-white transition-colors cursor-pointer">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm text-[#E8E6E1] hover:text-white transition-colors cursor-pointer">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-[#E8E6E1]">
                <Phone className="w-4 h-4 text-[#6A7B69] shrink-0" /> 0117 123 4567
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#E8E6E1]">
                <Mail className="w-4 h-4 text-[#6A7B69] shrink-0" /> info@kingsroofsbristol.co.uk
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#E8E6E1]">
                <MapPin className="w-4 h-4 text-[#6A7B69] shrink-0 mt-0.5" />
                <span>12 Kingswood Trading Estate,<br />Bristol BS15 8JD</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#E8E6E1]">
                <Clock className="w-4 h-4 text-[#6A7B69] shrink-0" /> Mon–Fri 8am–6pm, Sat 9am–2pm
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications Row */}
        <div className="border-t border-white/10 pt-6 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {["Which?", "Checkatrade", "TrustMark", "NFRC"].map((cert) => (
              <span key={cert} className="text-sm font-display font-semibold text-white/50 hover:text-white/80 transition-colors">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">© 2025 Kings Roofs Bristol LTD. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="hover:text-white/70 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white/70 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white/70 cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
