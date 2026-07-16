"use client";

import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import ScrollReveal from "./ScrollReveal";

const LatestProducts = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <ScrollReveal animation="fade-up">
        <Title
          title="Latest Products"
          description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
          href="/shop"
        />
      </ScrollReveal>
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
      </div>
    </div>
  );
};

export default LatestProducts;
