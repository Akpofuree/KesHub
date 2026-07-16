"use client";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const BestSelling = () => {
  const displayQuantity = 8;
  const products = useSelector((state) => state.product.list);

  return (
    <div id="bestselling" className="px-6 my-30 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Title
          title="Best Selling"
          description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
          href="/shop"
        />
      </motion.div>
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {products
          .slice()
          .sort((a, b) => b.rating.length - a.rating.length)
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

export default BestSelling;
