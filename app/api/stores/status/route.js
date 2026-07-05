import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "../../_lib/response";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return fail("Unauthorized", 401);
    }

    const store = await prisma.store.findUnique({
      where: { userId },
      include: { user: true },
    });

    return ok(store);
  } catch {
    return fail("Failed to load store status", 500);
  }
}
