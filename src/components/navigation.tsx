"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Areas", href: "#areas" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(245,244,241,0.95)] backdrop-blur-md border-b border-black/[0.06] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex flex-col leading-tight">
            <span className={`font-display text-lg md:text-xl font-semibold tracking-tight transition-colors ${scrolled ? "text-[#2C2C2C]" : "text-white"}`}>
              Kings Roofs
            </span>
            <span className={`text-[10px] md:text-xs font-medium tracking-wider transition-colors ${scrolled ? "text-[#6B6B6B]" : "text-white/70"}`}>
              BRISTOL LTD
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-xs font-medium tracking-wide transition-colors group ${
                  scrolled ? "text-[#2C2C2C]" : "text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3D5A3C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
              </a>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:01171234567" className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${scrolled ? "text-[#6B6B6B]" : "text-white/80"}`}>
              <Phone className="w-3.5 h-3.5" /> 0117 123 4567
            </a>
            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, "#quote")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                scrolled
                  ? "bg-[#3D5A3C] text-white hover:bg-[#2E4A2D]"
                  : "bg-white text-[#2C2C2C] hover:bg-white/90"
              }`}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-[#2C2C2C]" : "text-white"}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#F5F4F1] md:hidden pt-20"
          >
            <nav className="flex flex-col items-center gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-display text-2xl font-semibold text-[#2C2C2C]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#quote"
                onClick={(e) => handleNavClick(e, "#quote")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-8 py-3 bg-[#3D5A3C] text-white font-semibold rounded-lg"
              >
                Get a Quote
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
