import { NextResponse } from "next/server";
import { getOrCreateCart } from "@/lib/cart";
import { withRlsContext } from "@/lib/rls";

export async function PUT(request, { params }) {
  const { quantity } = await request.json();
  const { sessionId } = await getOrCreateCart();
  const item = await withRlsContext({ sessionId }, async (tx) =>
    tx.cartItem.update({
      where: { id: params.itemId },
      data: { quantity },
    })
  );
  return NextResponse.json(item);
}

export async function DELETE(_, { params }) {
  const { sessionId } = await getOrCreateCart();
  await withRlsContext({ sessionId }, async (tx) =>
    tx.cartItem.delete({ where: { id: params.itemId } })
  );
  return NextResponse.json({ success: true });
}
