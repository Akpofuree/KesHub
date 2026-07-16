"use client";
import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestProducts = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Title
          title="Latest Products"
          description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
          href="/shop"
        />
      </motion.div>
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default LatestProducts;
