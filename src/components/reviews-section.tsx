"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reviews = [
  {
    stars: 5,
    quote: "Kings Roofs replaced our entire flat roof in just 3 days. The team was professional, tidy, and kept us informed throughout. Couldn't recommend them more highly!",
    author: "Sarah Mitchell",
    location: "Clifton, Bristol",
    avatar: "/avatar-sarah.png",
    platform: "Google",
  },
  {
    stars: 5,
    quote: "Called them at 8pm during a storm with a leak. They were here by 9am the next morning and fixed it on the spot. Absolutely brilliant emergency service.",
    author: "James Thompson",
    location: "Bath",
    avatar: "/avatar-james.png",
    platform: "Checkatrade",
  },
  {
    stars: 5,
    quote: "We've used Kings Roofs for all our properties. Their attention to detail is unmatched — they spotted issues two other companies missed. True professionals.",
    author: "Emma Richards",
    location: "Redland, Bristol",
    avatar: "/avatar-emma.png",
    platform: "Google",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-20 lg:py-24 bg-[#F5F4F1]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#3D5A3C] bg-[rgba(61,90,60,0.1)] mb-4">
            CUSTOMER REVIEWS
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2C2C2C] tracking-tight">
            Don&apos;t Just Take Our Word For It
          </h2>
          <p className="mt-4 text-[#6B6B6B] max-w-xl mx-auto">
            Join hundreds of happy homeowners across Bristol and Bath who&apos;ve trusted us with their roofs.
          </p>
        </motion.div>

        {/* Rating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-white rounded-2xl border border-black/[0.08] p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="font-display text-2xl md:text-3xl font-semibold text-[#2C2C2C]">4.9 <span className="text-base font-normal text-[#6B6B6B]">out of 5</span></div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4A574] text-[#D4A574]" />
              ))}
            </div>
            <span className="text-sm text-[#6B6B6B]">Based on 127 reviews</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center"><span className="font-semibold">4.9</span> <span className="text-[#6B6B6B]">Google</span></div>
            <div className="text-center"><span className="font-semibold">9.89</span> <span className="text-[#6B6B6B]">Checkatrade</span></div>
            <div className="text-center"><span className="font-semibold">4.8</span> <span className="text-[#6B6B6B]">Trustpilot</span></div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#2C2C2C] italic mb-6 line-clamp-4">&ldquo;{review.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0">
                  <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#2C2C2C]">{review.author}</div>
                  <div className="text-xs text-[#6B6B6B]">{review.location}</div>
                </div>
                <span className="text-xs text-[#6B6B6B] opacity-50 shrink-0">{review.platform}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
