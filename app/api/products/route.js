import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const condition = searchParams.get("condition");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brand = searchParams.get("brand");

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
