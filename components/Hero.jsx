"use client";
import { assets } from "@/assets/assets";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";
import { motion } from "framer-motion";

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const scrollToBestSelling = () => {
    const bestSellingSection = document.getElementById("bestselling");
    if (bestSellingSection) {
      bestSellingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-6">
      <div className="flex flex-col gap-8 max-w-7xl mx-auto my-10">
        <div className="relative flex-1 flex flex-col bg-slate-950 text-white rounded-[32px] xl:min-h-100 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.25),_transparent_40%),_linear-gradient(180deg,_rgba(15,23,42,0.7),_rgba(15,23,42,0.75))]" />
          <div className="relative p-8 sm:p-16 z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-emerald-100/20 text-emerald-600 pr-4 p-1 rounded-full text-xs sm:text-sm hover:bg-emerald-100/40 transition-colors cursor-pointer"
              >
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-white text-xs">
                  NEWS
                </span>{" "}
                Free Shipping on Orders Above $50!{" "}
                <ChevronRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl leading-[1.1] my-3 font-semibold max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Quality tech. Priced like it should be.
            </motion.h2>
            <motion.p
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Curated smartphones, laptops, and accessories. Priced for quality,
              priced for you.
            </motion.p>
            <motion.div
              className="text-slate-200 text-sm sm:text-base font-medium mt-4 sm:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p>No hidden fees. No inflated prices.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block self-center sm:self-start mt-6"
            >
              <Link
                href="/about"
                className="inline-block bg-emerald-600 text-white text-sm py-3 px-8 rounded-full hover:bg-emerald-700 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm relative z-10"
          >
            <Image
              className="w-full"
              src={assets.hero_model_img}
              alt=""
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-5 w-full text-sm text-slate-700">
          <motion.div
            className="flex-1 flex flex-col items-start justify-between gap-6 w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 px-8 hover:border-emerald-300 transition duration-300 cursor-pointer"
            onClick={scrollToBestSelling}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex-1">
              <p className="text-3xl font-semibold text-slate-950">
                Best products
              </p>
              <p className="mt-4 text-slate-500">View more</p>
            </div>
            <Image
              className="w-24 sm:w-28 object-contain self-center"
              src={assets.hero_product_img1}
              alt=""
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex w-full"
          >
            <Link
              href="/shop?minPrice=0&maxPrice=50"
              className="flex-1 flex flex-col items-start justify-between gap-4 w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 px-8 hover:border-emerald-300 transition duration-300"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-950">
                  Premium tech, honest prices.
                </p>
                <p className="mt-3 text-sm text-slate-500 max-w-sm">
                  Save up to 20% on selected gadgets - no gimmicks, just fair
                  pricing done right.
                </p>
              </div>
              <span className="text-slate-600 font-medium">View more</span>
              <Image
                className="w-28 sm:w-32 object-contain self-center"
                src={assets.hero_product_img2}
                alt=""
              />
            </Link>
          </motion.div>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
