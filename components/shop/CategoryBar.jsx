"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Laptop,
  Headphones,
  Smartphone,
  PlugZap,
  TabletSmartphone,
  Watch,
  Gamepad2,
  Store,
} from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All", icon: Store },
  { value: "PHONES", label: "Phones", icon: Smartphone },
  { value: "LAPTOPS", label: "Laptops", icon: Laptop },
  { value: "HEADPHONES", label: "Headphones", icon: Headphones },
  { value: "ACCESSORIES", label: "Accessories", icon: PlugZap },
  { value: "TABLETS", label: "Tablets", icon: TabletSmartphone },
  { value: "SMARTWATCHES", label: "Smartwatches", icon: Watch },
  { value: "GAMING", label: "Gaming", icon: Gamepad2 },
];

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  function setCategory(value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("category", value);
    else params.delete("category");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;

        return (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition ${
              active === cat.value
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            <Icon size={16} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
