import { prisma } from "@/lib/prisma";

export async function listStores() {
    return prisma.store.findMany({
        include: {
            user: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createStore(data) {
    return prisma.store.create({
        data,
    });
}

export async function updateStoreStatus(storeId, status, isActive = false) {
    return prisma.store.update({
        where: { id: storeId },
        data: { status, isActive },
    });
}

export async function updateStoreActive(storeId, isActive) {
    return prisma.store.update({
        where: { id: storeId },
        data: { isActive },
    });
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
