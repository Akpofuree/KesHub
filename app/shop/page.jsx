import { prisma } from "@/lib/prisma";
import CategoryBar from "@/components/shop/CategoryBar";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductCard from "@/components/shop/ProductCard";
import ShopControls from "@/components/shop/ShopControls";
import Pagination from "@/components/shop/Pagination";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAvailableProducts } from "@/lib/public-data";

export default async function ShopPage({ searchParams }) {
  const { category, condition, search, minPrice, maxPrice, brand, sort, page } =
    await searchParams;

  const currentPage = Math.max(1, parseInt(page) || 1);
  const itemsPerPage = 12;

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

  const isDefaultBrowse =
    !category &&
    !condition &&
    !search &&
    !minPrice &&
    !maxPrice &&
    !brand &&
    sort !== "price_asc" &&
    sort !== "price_desc" &&
    sort !== "newest";

  const [totalProducts, products] = isDefaultBrowse
    ? await Promise.all([
        prisma.product.count({ where }),
        getAvailableProducts(),
      ])
    : await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          orderBy,
          skip: (currentPage - 1) * itemsPerPage,
          take: itemsPerPage,
        }),
      ]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pagedProducts = isDefaultBrowse
    ? products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : products;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-white bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Shop
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Browse gadgets
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <CategoryBar />
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <FilterSidebar />

          <div className="flex-1">
            <ShopControls totalProducts={totalProducts} />

            {pagedProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-400 shadow-sm">
                <p className="mb-4 text-4xl">🛍️</p>
                <p className="text-lg font-medium text-slate-700">
                  No products found
                </p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {pagedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      data-aos="fade-up"
                      data-aos-duration="700"
                      data-aos-delay={Math.min(index * 50, 300)}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
