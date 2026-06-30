import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where = {
    ...(category && { category }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const baseSlug = slugify(`${body.brand}-${body.name}-${body.model || ""}`, {
    lower: true,
    strict: true,
  });
  const slug = `${baseSlug}-${Date.now()}`;

  const product = await prisma.product.create({
    data: {
      ...body,
      slug,
      price: parseFloat(body.price),
      comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
      stock: parseInt(body.stock),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
