import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (productId) {
    const item = await prisma.wishlistItem.findUnique({
      where: { sessionId_productId: { sessionId: userId, productId } },
    });
    return NextResponse.json({ exists: !!item });
  }

  const wishlist = await prisma.wishlistItem.findMany({
    where: { sessionId: userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(wishlist);
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await request.json();

  const item = await prisma.wishlistItem.upsert({
    where: { sessionId_productId: { sessionId: userId, productId } },
    update: {},
    create: { sessionId: userId, productId },
    include: { product: true },
  });

  return NextResponse.json(item);
}

export async function DELETE(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await request.json();

  await prisma.wishlistItem.delete({
    where: { sessionId_productId: { sessionId: userId, productId } },
  });

  return NextResponse.json({ success: true });
}
