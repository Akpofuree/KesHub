"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";

// showWordmark: shows the KES HUB wordmark beside the logo.
export default function BrandLogo({
  className = "",
  showWordmark = true,
  variant = "auto",
}) {
  const logoSrc =
    variant === "dark"
      ? assets.kes_hub_logo_dark
      : variant === "light"
        ? assets.kes_hub_logo_light
        : assets.kes_hub_logo_light;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={logoSrc}
        alt="KES HUB logo"
        width={100}
        height={100}
        className="h-16 w-16 object-contain"
      />
      {showWordmark && (
        <div className="leading-none">
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            KES HUB
          </div>
        </div>
      )}
    </div>
  );
}
