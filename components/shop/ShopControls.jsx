"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ShopControls({ totalProducts }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`/shop?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort") || "";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
      <p className="text-sm text-slate-600 font-medium mb-4 sm:mb-0">
        Showing {totalProducts} {totalProducts === 1 ? "product" : "products"}
      </p>
      
      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm text-slate-600 font-medium">Sort by:</label>
        <select
          id="sort"
          value={currentSort}
          onChange={handleSortChange}
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-700 font-medium cursor-pointer"
        >
          <option value="">Default (Featured)</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Average Rating</option>
        </select>
      </div>
    </div>
  );
}
