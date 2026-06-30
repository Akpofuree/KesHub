"use client";
import { useRouter, useSearchParams } from "next/navigation";

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

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  }

  const activeCondition = searchParams.get("condition") || "";

  return (
    <aside className="w-56 shrink-0">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
        <div className="space-y-2">
          {CONDITIONS.map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condition"
                value={c.value}
                checked={activeCondition === c.value}
                onChange={() => updateParam("condition", c.value)}
                className="accent-black"
              />
              <span className="text-sm text-gray-700">{c.label}</span>
            </label>
          ))}
          {activeCondition && (
            <button onClick={() => updateParam("condition", "")}
              className="text-xs text-gray-400 hover:text-gray-600 underline mt-1">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Price Range (₦)</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            defaultValue={searchParams.get("minPrice") || ""}
            onBlur={(e) => updateParam("minPrice", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            defaultValue={searchParams.get("maxPrice") || ""}
            onBlur={(e) => updateParam("maxPrice", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
