import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
    const [products, stores, orders, allOrders] = await Promise.all([
        prisma.product.count(),
        prisma.store.count(),
        prisma.order.count(),
        prisma.order.findMany({
            select: {
                createdAt: true,
                total: true,
            },
            orderBy: { createdAt: "asc" },
        }),
    ]);

    const revenue = allOrders.reduce((sum, order) => sum + order.total, 0);

    return {
        products,
        stores,
        orders,
        revenue: revenue.toFixed(2),
        allOrders,
    };
}

export async function getStoreDashboardData(storeId) {
    const [totalProducts, totalOrders, ratings, orders] = await Promise.all([
        prisma.product.count({ where: { storeId } }),
        prisma.order.count({ where: { storeId } }),
        prisma.rating.findMany({
            where: {
                product: {
                    storeId,
                },
            },
            include: {
                user: true,
                product: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma.order.findMany({
            where: { storeId },
            select: { total: true },
        }),
    ]);

    const totalEarnings = orders.reduce((sum, order) => sum + order.total, 0);

    return {
        totalProducts,
        totalOrders,
        totalEarnings: totalEarnings.toFixed(2),
        ratings,
    };
}

