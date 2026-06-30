import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart";

export async function GET() {
  const { cart } = await getOrCreateCart();
  return NextResponse.json(cart);
}

export async function POST(request) {
  const { productId, quantity = 1 } = await request.json();
  const { cart } = await getOrCreateCart();

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  return NextResponse.json(updated);
}
