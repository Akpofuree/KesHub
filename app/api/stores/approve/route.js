import { prisma } from "@/lib/prisma";
import { fail, ok } from "../../_lib/response";
import { storeApprovalSchema } from "@/lib/validators/store";
import { z } from "zod";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { storeId, status } = storeApprovalSchema.parse(body);

        const store = await prisma.store.update({
            where: { id: storeId },
            data: {
                status,
                isActive: status === "approved",
            },
        });

        return ok(store);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid approval payload", 400, error.flatten());
        }
        return fail("Failed to update store status", 500);
    }
}

