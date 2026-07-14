import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/lib/logActivity";
import {
  invalidateCategoryListings,
  invalidateHomepageData,
  invalidateProductListings,
} from "@/lib/cache";

export async function GET(_, { params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const images = Array.isArray(body.images) ? body.images : undefined;

  const existingProduct = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!existingProduct)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const previousCategory = existingProduct.category;

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...body,
      ...(images !== undefined ? { images } : {}),
      price: parseFloat(body.price),
      comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
      stock: parseInt(body.stock || "0", 10),
    },
  });

  await prisma.productHistory.create({
    data: {
      productId: product.id,
      editedBy: userId,
      snapshot: existingProduct,
    },
  });

  await logActivity({
    userId,
    action: "UPDATE",
    entityType: "Product",
    entityId: product.id,
    metadata: { productName: product.name, slug: product.slug },
  });

  await invalidateProductListings(previousCategory);
  if (product.category !== previousCategory)
    await invalidateProductListings(product.category);
  await invalidateCategoryListings();
  await invalidateHomepageData();

  return NextResponse.json(product);
}

export async function DELETE(_, { params }) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const product = await prisma.product.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });

  await logActivity({
    userId,
    action: "DELETE",
    entityType: "Product",
    entityId: product.id,
    metadata: { productName: product.name, slug: product.slug },
  });

  await invalidateProductListings(product.category);
  await invalidateCategoryListings();
  await invalidateHomepageData();

  return NextResponse.json({ success: true });
}
