import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  cacheAside,
  cacheKeys,
  productCategoryCacheKey,
} from "@/lib/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const condition = searchParams.get("condition");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brand = searchParams.get("brand");

  const hasCatalogFilters =
    !search && !condition && !minPrice && !maxPrice && !brand;

  if (hasCatalogFilters && (featured || category)) {
    const cacheKey = featured
      ? cacheKeys.featuredProducts
      : productCategoryCacheKey(category);

    const products = await cacheAside(
      cacheKey,
      async () =>
        prisma.product.findMany({
          where: {
            isActive: true,
            ...(category && { category }),
            ...(featured && { isFeatured: true }),
          },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        }),
      300,
    );

    return NextResponse.json(products);
  }

  if (hasCatalogFilters && !featured && !category) {
    const products = await cacheAside(
      cacheKeys.availableProducts,
      async () =>
        prisma.product.findMany({
          where: {
            isActive: true,
          },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        }),
      300,
    );

    return NextResponse.json(products);
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && { category }),
      ...(condition && { condition }),
      ...(featured && { isFeatured: true }),
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
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(products);
}
