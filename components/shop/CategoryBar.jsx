"use client";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { value: "", label: "All", icon: "🏪" },
  { value: "PHONES", label: "Phones", icon: "📱" },
  { value: "LAPTOPS", label: "Laptops", icon: "💻" },
  { value: "HEADPHONES", label: "Headphones", icon: "🎧" },
  { value: "ACCESSORIES", label: "Accessories", icon: "🔌" },
  { value: "TABLETS", label: "Tablets", icon: "📟" },
  { value: "SMARTWATCHES", label: "Smartwatches", icon: "⌚" },
  { value: "GAMING", label: "Gaming", icon: "🎮" },
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
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition ${
            active === cat.value
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
