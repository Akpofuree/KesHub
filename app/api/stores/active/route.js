import { prisma } from "@/lib/prisma";
import { fail, ok } from "../../_lib/response";
import { storeActiveSchema } from "@/lib/validators/store";
import { z } from "zod";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { storeId, isActive } = storeActiveSchema.parse(body);

        const store = await prisma.store.update({
            where: { id: storeId },
            data: { isActive },
        });

        return ok(store);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid store payload", 400, error.flatten());
        }
        return fail("Failed to update store active state", 500);
    }
}

