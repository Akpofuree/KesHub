"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";

function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setItems(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const moveToCart = async (productId) => {
    dispatch(addToCart({ productId }));
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 mb-6 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        <ArrowLeft size={16} />
        Back to shop
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-emerald-600" />
        <h1 className="text-3xl font-semibold text-slate-950">Wishlist</h1>
      </div>

      {loading ? (
        <div className="text-slate-500">Loading wishlist...</div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-4xl mb-4">💚</p>
          <p className="text-lg font-semibold text-slate-900">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-slate-500">
            Save products you like and come back anytime.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={Math.min(index * 50, 300)}
            >
              <div className="aspect-square bg-slate-50">
                <img
                  src={item.product?.images?.[0] || "/placeholder.jpg"}
                  alt={item.product?.name || "Wishlist item"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {item.product?.brand}
                </p>
                <h2 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-2">
                  {item.product?.name}
                </h2>
                <p className="mt-2 font-bold text-slate-950">
                  {formatPrice(item.product?.price || 0)}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/shop/${item.product?.slug}`}
                    className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => moveToCart(item.productId)}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-white"
                    aria-label="Move to cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
