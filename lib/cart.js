import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set("cart_session", sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  const cart = await prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
    include: { CartItem: { include: { Product: true } } },
  });

  const formattedCart = {
    ...cart,
    items: cart.CartItem?.map(item => ({
      ...item,
      product: item.Product
    })) || []
  };

  return { cart: formattedCart, sessionId };
}
