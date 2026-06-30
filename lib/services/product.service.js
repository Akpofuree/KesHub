import { prisma } from "@/lib/prisma";

export async function listProducts() {
    return prisma.product.findMany({
        include: {
            store: true,
            rating: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createProduct(data) {
    return prisma.product.create({
        data,
    });
}

export async function updateProductStock(productId, inStock) {
    return prisma.product.update({
        where: { id: productId },
        data: { inStock },
    });
}

export async function listProductsByStore(storeId) {
    return prisma.product.findMany({
        where: { storeId },
        include: { rating: true, store: true },
        orderBy: { createdAt: "desc" },
    });
}

