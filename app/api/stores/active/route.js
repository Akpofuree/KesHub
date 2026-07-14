import { fail, ok } from "../../_lib/response";
import { storeActiveSchema } from "@/lib/validators/store";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { withRlsContext } from "@/lib/rls";

export async function PATCH(request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return fail("Unauthorized", 401);
        }

        const body = await request.json();
        const { storeId, isActive } = storeActiveSchema.parse(body);

        const store = await withRlsContext({ userId }, async (tx) =>
            tx.store.update({
                where: { id: storeId },
                data: { isActive },
            })
        );

        return ok(store);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid store payload", 400, error.flatten());
        }
        return fail("Failed to update store active state", 500);
    }
}
