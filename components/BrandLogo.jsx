'use client'

import Image from "next/image";
import { assets } from "@/assets/assets";

export default function BrandLogo({ className = "", showWordmark = true, variant = "auto" }) {
    const logoSrc = variant === "dark"
        ? assets.kes_hub_logo_dark
        : variant === "light"
            ? assets.kes_hub_logo_light
            : assets.kes_hub_logo_light;

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <Image src={logoSrc} alt="KES HUB logo" width={80} height={80} className="h-12 w-12 object-contain" />
            {showWordmark && (
                <div className="leading-none">
                    <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">KES HUB</div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Gadgets marketplace</div>
                </div>
            )}
        </div>
    );
}
