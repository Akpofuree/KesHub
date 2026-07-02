"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Title = ({ title, description, visibleButton = true, href = "" }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-3xl sm:text-4xl font-semibold text-slate-950">
        {title}
      </h2>
      <div className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
        {description}
      </div>
      {visibleButton && (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 text-emerald-600 font-semibold"
        >
          View more <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default Title;
