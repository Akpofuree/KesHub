"use client";
import { assets } from "@/assets/assets";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import CategoriesMarquee from "./CategoriesMarquee";

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
            <ScrollReveal animation="fade-in" className="inline-flex">
              <Link
                href="/shop"
                suppressHydrationWarning
                className="inline-flex items-center gap-3 bg-emerald-100/20 text-emerald-600 pr-4 p-1 rounded-full text-xs sm:text-sm hover:bg-emerald-100/40 transition-colors cursor-pointer"
              >
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-white text-xs mr-2">
                  NEWS
                </span>
                <span suppressHydrationWarning>Free Shipping on Orders Above $50!</span>
                <ChevronRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={100}>
              <h2 className="text-4xl sm:text-5xl leading-[1.1] my-3 font-semibold max-w-xl">
                Quality tech. Priced like it should be.
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={200}>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-8">
                Curated smartphones, laptops, and accessories. Priced for quality,
                priced for you.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300} className="text-slate-200 text-sm sm:text-base font-medium mt-4 sm:mt-8">
              <p>No hidden fees. No inflated prices.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400} className="inline-block self-center sm:self-start mt-6">
              <Link
                href="/about"
                suppressHydrationWarning
                className="inline-block bg-emerald-600 text-white text-sm py-3 px-8 rounded-full hover:bg-emerald-700 transition"
              >
                Learn More
              </Link>
            </ScrollReveal>
          </div>
          <ScrollReveal animation="fade-right" delay={300} className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm relative z-10">
            <Image className="w-full" src={assets.hero_model_img} alt="" />
          </ScrollReveal>
        </div>
        <div className="flex flex-col gap-5 w-full text-sm text-slate-700">
          <ScrollReveal
            animation="fade-up"
            delay={100}
            className="flex-1 flex flex-col items-start justify-between gap-6 w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 px-8 hover:border-emerald-300 transition duration-300 cursor-pointer"
            onClick={scrollToBestSelling}
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
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200} className="flex-1 flex w-full">
            <Link
              href="/shop?minPrice=0&maxPrice=50"
              suppressHydrationWarning
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
          </ScrollReveal>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
