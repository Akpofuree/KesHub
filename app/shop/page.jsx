import { prisma } from "@/lib/prisma";
import CategoryBar from "@/components/shop/CategoryBar";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductCard from "@/components/shop/ProductCard";

export default async function ShopPage({ searchParams }) {
  const { category, condition, search, minPrice, maxPrice, brand } = searchParams;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && { category }),
      ...(condition && { condition }),
      ...(brand && { brand: { equals: brand, mode: "insensitive" } }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: parseFloat(minPrice) }),
          ...(maxPrice && { lte: parseFloat(maxPrice) }),
        },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Quick-Links */}
      <div className="mb-8">
        <CategoryBar />
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Product Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{products.length} products</p>
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📦</p>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
