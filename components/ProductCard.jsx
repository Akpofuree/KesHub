"use client";
import { StarIcon, EyeIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import FallbackImage from "@/components/FallbackImage";
import { assets } from "@/assets/assets";
import { getFirstImage } from "@/lib/utils/imageUtils";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cartItems) || {};
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // calculate the average rating of the product
  const average = product.rating?.length
    ? product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
      product.rating.length
    : 0;
  const rating = Math.round(average);

  // Use slug if available, otherwise fall back to id
  const productPath = product.slug
    ? `/shop/${product.slug}`
    : `/product/${product.id}`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cart[product.id]) {
      dispatch(addToCart({ productId: product.id }));
    } else {
      router.push("/cart");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToWishlist) return;

    setIsAddingToWishlist(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.ok) {
        toast.success("Added to wishlist!");
      } else if (res.status === 401) {
        toast.error("Please sign in to add to wishlist.");
        router.push("/sign-in");
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <Link href={productPath} className="group max-xl:mx-auto block w-full max-w-[240px]">
      <div className="bg-[#F5F5F5] h-40 sm:h-68 rounded-lg flex items-center justify-center relative overflow-hidden">
        <FallbackImage
          width={500}
          height={500}
          className="max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300"
          src={getFirstImage(product.images)}
          fallbackSrc={assets.upload_area}
          alt=""
        />

        {/* Right side hover icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 z-10">
          <button 
            className="bg-white p-2 rounded-full shadow-md text-slate-600 hover:text-green-600 hover:bg-slate-50 transition-colors" 
            title="Quick Look" 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(productPath); }}
          >
            <EyeIcon size={18} />
          </button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            disabled={isAddingToWishlist}
            className="bg-white p-2 rounded-full shadow-md text-slate-600 hover:text-green-600 hover:bg-slate-50 transition-colors disabled:opacity-50" 
            title="Add to Wishlist" 
            onClick={handleAddToWishlist}
          >
            <HeartIcon size={18} className={isAddingToWishlist ? "animate-pulse" : ""} />
          </motion.button>
        </div>
      </div>
      
      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-3 relative h-[60px] overflow-hidden">
        <div className="flex-1">
          <p className="line-clamp-1 font-medium">{product.name}</p>
          <div className="flex mt-1">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent"
                  fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
          </div>
        </div>
        
        {/* Price and Add to Cart area */}
        <div className="flex flex-col items-end flex-shrink-0 relative w-24">
          <p className="transform group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-300 font-semibold absolute right-0 top-0">
            {currency}
            {typeof product.price === "number"
              ? product.price.toLocaleString("en-NG")
              : product.price}
          </p>
          <button 
            onClick={handleAddToCart}
            className="absolute right-0 top-0 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-800 whitespace-nowrap"
          >
            {cart[product.id] ? "View Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
