import { prisma } from "@/lib/prisma";
import { fail, ok } from "../../_lib/response";
import { storeApprovalSchema } from "@/lib/validators/store";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/lib/logActivity";

export async function PATCH(request) {
  try {
    const { userId } = await auth();
    if (!userId) return fail("Unauthorized", 401);

    const body = await request.json();
    const { storeId, status } = storeApprovalSchema.parse(body);

    const store = await prisma.store.update({
      where: { id: storeId },
      data: {
        status,
        isActive: status === "approved",
      },
    });

    await logActivity({
      userId,
      action: status === "approved" ? "APPROVE" : "REJECT",
      entityType: "Store",
      entityId: store.id,
      metadata: { storeName: store.name, username: store.username, status },
    });

    return ok(store);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return fail("Invalid approval payload", 400, error.flatten());
    }
    return fail("Failed to update store status", 500);
  }
}
