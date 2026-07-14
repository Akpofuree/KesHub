import { NextResponse } from "next/server";
import { getOrCreateCart } from "@/lib/cart";
import { withRlsContext } from "@/lib/rls";

export async function GET() {
  try {
    const { cart } = await getOrCreateCart();
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

export async function POST(request) {
  const { productId, quantity = 1 } = await request.json();
  const { cart } = await getOrCreateCart();

  const updated = await withRlsContext(
    { sessionId: cart.sessionId },
    async (tx) => {
      const existing = await tx.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });

      if (existing) {
        await tx.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
        });
      } else {
        await tx.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        });
      }

      return tx.cart.findUnique({
        where: { id: cart.id },
        include: { CartItem: { include: { Product: true } } },
      });
    },
  );

  const formattedUpdated = {
    ...updated,
    items:
      updated.CartItem?.map((item) => ({
        ...item,
        product: item.Product,
      })) || [],
  };

  return NextResponse.json(formattedUpdated);
}

export async function DELETE(request) {
  const { productId } = await request.json();
  const { cart } = await getOrCreateCart();

  const updated = await withRlsContext(
    { sessionId: cart.sessionId },
    async (tx) => {
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });

      return tx.cart.findUnique({
        where: { id: cart.id },
        include: { CartItem: { include: { Product: true } } },
      });
    },
  );

  const formattedUpdated = {
    ...updated,
    items:
      updated.CartItem?.map((item) => ({
        ...item,
        product: item.Product,
      })) || [],
  };

  return NextResponse.json(formattedUpdated);
}
