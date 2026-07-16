"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-950 text-white">
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.08]">
          Ready to upgrade your shopping experience?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-snug">
          Discover smarter device shopping backed by fast delivery, friendly
          support and trusted products.
        </p>

        <Link
          href="/shop"
          className="inline-flex mt-6 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}
