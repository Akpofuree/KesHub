import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { withRlsContext } from "@/lib/rls";

export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (productId) {
    const item = await withRlsContext({ userId }, async (tx) =>
      tx.wishlistItem.findUnique({
        where: { sessionId_productId: { sessionId: userId, productId } },
      })
    );
    return NextResponse.json({ exists: !!item });
  }

  const wishlist = await withRlsContext({ userId }, async (tx) =>
    tx.wishlistItem.findMany({
      where: { sessionId: userId },
      include: { Product: true },
      orderBy: { createdAt: "desc" },
    })
  );
  return NextResponse.json(
    wishlist.map((item) => ({
      ...item,
      product: item.Product,
    }))
  );
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await request.json();

  try {
    const item = await withRlsContext({ userId }, async (tx) =>
      tx.wishlistItem.upsert({
        where: { sessionId_productId: { sessionId: userId, productId } },
        update: {},
        create: { id: Date.now().toString() + Math.random().toString(36).slice(2), sessionId: userId, productId },
        include: { Product: true },
      })
    );

    return NextResponse.json({
      ...item,
      product: item.Product,
    });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await request.json();

  await withRlsContext({ userId }, async (tx) =>
    tx.wishlistItem.delete({
      where: { sessionId_productId: { sessionId: userId, productId } },
    })
  );

  return NextResponse.json({ success: true });
}
