import { prisma } from "@/lib/prisma";
import {
    invalidateCategoryListings,
    invalidateHomepageData,
    invalidateProductListings,
} from "@/lib/cache";

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
    const product = await prisma.product.create({
        data,
    });

    await invalidateProductListings(product.category);
    await invalidateCategoryListings();
    await invalidateHomepageData();

    return product;
}

export async function updateProductStock(productId, inStock) {
    const product = await prisma.product.update({
        where: { id: productId },
        data: { inStock },
    });

    await invalidateProductListings(product.category);
    await invalidateHomepageData();

    return product;
}

export async function listProductsByStore(storeId) {
    return prisma.product.findMany({
        where: { storeId },
        include: { rating: true, store: true },
        orderBy: { createdAt: "desc" },
    });
}
