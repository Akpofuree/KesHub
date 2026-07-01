"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CONDITIONS = [
  { value: "BRAND_NEW", label: "Brand New" },
  { value: "BOX_TON", label: "Box Ton" },
  { value: "UK_USED", label: "UK Used" },
  { value: "GRADE_A", label: "Grade A" },
  { value: "GRADE_B", label: "Grade B" },
  { value: "GRADE_C", label: "Grade C" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // Reset page when filtering
    router.push(`/shop?${params.toString()}`);
  }

  function applyPriceFilter() {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    
    params.delete("page"); // Reset page when filtering
    router.push(`/shop?${params.toString()}`);
  }

  const activeCondition = searchParams.get("condition") || "";

  return (
    <aside className="w-56 shrink-0">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
        <div className="space-y-2">
          {CONDITIONS.map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="condition"
                value={c.value}
                checked={activeCondition === c.value}
                onChange={() => updateParam("condition", c.value)}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm text-gray-700 group-hover:text-green-700 transition-colors">{c.label}</span>
            </label>
          ))}
          {activeCondition && (
            <button onClick={() => updateParam("condition", "")}
              className="text-xs text-gray-400 hover:text-red-500 underline mt-2 block transition-colors">
              Clear condition
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Price Range (₦)</h3>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>
          <button 
            onClick={applyPriceFilter}
            className="w-full bg-slate-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Apply Price
          </button>
          {(searchParams.get("minPrice") || searchParams.get("maxPrice")) && (
            <button 
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                const params = new URLSearchParams(searchParams);
                params.delete("minPrice");
                params.delete("maxPrice");
                params.delete("page");
                router.push(`/shop?${params.toString()}`);
              }}
              className="text-xs text-gray-400 hover:text-red-500 underline self-start transition-colors"
            >
              Clear price
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
