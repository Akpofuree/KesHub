import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { quantity } = await request.json();
  const item = await prisma.cartItem.update({
    where: { id: params.itemId },
    data: { quantity },
  });
  return NextResponse.json(item);
}

export async function DELETE(_, { params }) {
  await prisma.cartItem.delete({ where: { id: params.itemId } });
  return NextResponse.json({ success: true });
}
