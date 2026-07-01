import { prisma } from "@/lib/prisma";
import CategoryBar from "@/components/shop/CategoryBar";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import ShopControls from "@/components/shop/ShopControls";
import Pagination from "@/components/shop/Pagination";

export default async function ShopPage({ searchParams }) {
  const { category, condition, search, minPrice, maxPrice, brand, sort, page } = await searchParams;
  
  const currentPage = Math.max(1, parseInt(page) || 1);
  const itemsPerPage = 12;

  // Determine sorting
  let orderBy = [{ isFeatured: "desc" }, { createdAt: "desc" }];
  if (sort === "price_asc") {
    orderBy = [{ price: "asc" }];
  } else if (sort === "price_desc") {
    orderBy = [{ price: "desc" }];
  } else if (sort === "newest") {
    orderBy = [{ createdAt: "desc" }];
  }

  const where = {
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
  };

  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Quick-Links */}
      <div className="mb-8">
        <CategoryBar />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Product Grid */}
        <div className="flex-1">
          <ShopControls totalProducts={totalProducts} />
          
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📦</p>
              <p className="text-lg font-medium text-slate-700">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
