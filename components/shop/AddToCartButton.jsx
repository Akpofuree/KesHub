"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";

export default function AddToCartButton({ productId, disabled = false }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  async function handleAdd() {
    setLoading(true);
    // Dispatch to Redux state immediately for UI update
    dispatch(addToCart({ productId }));
    
    // Update backend asynchronously
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    setLoading(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || loading}
      className="w-full py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Adding..." : added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}
