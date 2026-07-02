"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
        <div className="relative flex-1 flex flex-col bg-slate-950 text-white rounded-[32px] xl:min-h-100 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.25),_transparent_40%),_linear-gradient(180deg,_rgba(15,23,42,0.7),_rgba(15,23,42,0.75))]" />
          <div className="relative p-8 sm:p-16 z-10">
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
            <h2 className="text-4xl sm:text-5xl leading-[1.1] my-3 font-semibold max-w-xl">
              Gadgets that feel premium, without the premium markup.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-8">
              Curated smartphones, laptops, and accessories — vetted for
              quality, priced for real people.
            </p>
            <div className="text-slate-200 text-sm sm:text-base font-medium mt-4 sm:mt-8">
              <p>Starts from</p>
              <p className="text-4xl font-semibold">{currency}4.90</p>
            </div>
            <Link
              href="/about"
              className="inline-block bg-emerald-600 text-white text-sm py-3 px-8 mt-6 rounded-full hover:bg-emerald-700 transition"
            >
              Learn More
            </Link>
          </div>
          <Image
            className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm relative z-10"
            src={assets.hero_model_img}
            alt=""
          />
        </div>
        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-700">
          <div
            className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 px-8 hover:border-emerald-300 transition duration-300 cursor-pointer"
            onClick={scrollToBestSelling}
          >
            <div className="flex-1">
              <p className="text-3xl font-semibold text-slate-950">
                Best products
              </p>
              <p className="flex items-center gap-1 mt-4 text-slate-500">
                View more{" "}
                <ArrowRightIcon className="transition-all" size={18} />{" "}
              </p>
            </div>
            <Image
              className="w-24 sm:w-28 object-contain"
              src={assets.hero_product_img1}
              alt=""
            />
          </div>
          <Link
            href="/shop?minPrice=0&maxPrice=50"
            className="flex-1 flex flex-col justify-between gap-4 w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 px-8 hover:border-emerald-300 transition duration-300"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-950">
                Premium tech, honest prices.
              </p>
              <p className="mt-3 text-sm text-slate-500 max-w-sm">
                Save up to 20% on selected gadgets — no gimmicks, just fair
                pricing done right.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600 font-medium">View more</span>
              <ArrowRightIcon
                className="transition-all text-slate-600"
                size={18}
              />
            </div>
            <Image
              className="w-28 sm:w-32 object-contain self-end"
              src={assets.hero_product_img2}
              alt=""
            />
          </Link>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
