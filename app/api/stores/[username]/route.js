import { fail, ok } from "../../_lib/response";
import { prisma } from "@/lib/prisma";

export async function GET(_request, { params }) {
    try {
        const { username } = params;

        const store = await prisma.store.findUnique({
            where: { username },
            include: {
                user: true,
                Product: {
                    include: {
                        store: true,
                        rating: true,
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!store) {
            return fail("Store not found", 404);
        }

        return ok(store);
    } catch {
        return fail("Failed to load store", 500);
    }
}
