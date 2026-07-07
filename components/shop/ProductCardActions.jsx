"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { ShoppingCartIcon, HeartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProductCardActions({ productId }) {
  const dispatch = useDispatch();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  async function handleAddToCart(e) {
    e.preventDefault();
    if (addingToCart) return;
    
    setAddingToCart(true);
    dispatch(addToCart({ productId }));
    
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    }).catch(console.error);
    
    setAddingToCart(false);
  }

  async function handleAddToWishlist(e) {
    e.preventDefault();
    if (addingToWishlist) return;

    setAddingToWishlist(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Added to wishlist!");
      } else if (res.status === 401) {
        toast.error("Please sign in to add to wishlist.");
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setAddingToWishlist(false);
    }
  }

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleAddToCart}
        disabled={addingToCart}
        title="Add to Cart"
        className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 hover:scale-110 transition-transform disabled:opacity-75"
      >
        <ShoppingCartIcon size={20} className={addingToCart ? "animate-pulse" : ""} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleAddToWishlist}
        disabled={addingToWishlist}
        title="Add to Wishlist"
        className="p-3 bg-white text-gray-900 rounded-full hover:bg-pink-50 hover:text-pink-600 hover:scale-110 transition-transform disabled:opacity-75"
      >
        <HeartIcon size={20} className={addingToWishlist ? "animate-pulse" : ""} />
      </motion.button>
    </div>
  );
}
