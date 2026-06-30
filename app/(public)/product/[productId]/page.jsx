import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Product({ params }) {
  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      store: true,
      rating: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrums */}
        <div className="  text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product.category}
        </div>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Description & Reviews */}
        <ProductDescription product={product} />
      </div>
    </div>
  );
}
