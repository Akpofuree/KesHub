import { withRlsContext } from "@/lib/rls";

export async function listStores(ctx = {}) {
    return withRlsContext({ userId: ctx.userId }, async (tx) =>
        tx.store.findMany({
            include: {
                user: true,
            },
            orderBy: { createdAt: "desc" },
        })
    );
}

export async function createStore(data, ctx = {}) {
    return withRlsContext({ userId: ctx.userId }, async (tx) =>
        tx.store.create({
            data,
        })
    );
}

export async function updateStoreStatus(storeId, status, isActive = false, ctx = {}) {
    return withRlsContext({ userId: ctx.userId }, async (tx) =>
        tx.store.update({
            where: { id: storeId },
            data: { status, isActive },
        })
    );
}

export async function updateStoreActive(storeId, isActive, ctx = {}) {
    return withRlsContext({ userId: ctx.userId }, async (tx) =>
        tx.store.update({
            where: { id: storeId },
            data: { isActive },
        })
    );
}

export async function getStoreById(storeId) {
    return prisma.store.findUnique({
        where: { id: storeId },
        include: { user: true },
    });
}

export async function getStoreByUsername(username) {
    return prisma.store.findUnique({
        where: { username },
        include: {
            user: true,
            products: {
                include: { store: true, rating: true },
                orderBy: { createdAt: "desc" },
            },
        },
    });
}
