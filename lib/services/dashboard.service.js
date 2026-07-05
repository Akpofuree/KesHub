import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
    const [products, stores, orders, allOrders] = await Promise.all([
        prisma.product.count(),
        prisma.store.count(),
        prisma.order.count(),
        prisma.order.findMany({
            select: {
                createdAt: true,
                totalAmount: true,
            },
            orderBy: { createdAt: "asc" },
        }),
    ]);

    const revenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
        products,
        stores,
        orders,
        revenue: revenue.toFixed(2),
        allOrders,
    };
}

export async function getStoreDashboardData(storeId) {
    const [totalProducts, orders, ratings] = await Promise.all([
        prisma.product.count({ where: { storeId } }),
        prisma.order.findMany({
            where: {
                orderItems: {
                    some: {
                        product: {
                            storeId,
                        },
                    },
                },
            },
            select: { totalAmount: true },
        }),
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
    ]);

    const totalOrders = orders.length;
    const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
        totalProducts,
        totalOrders,
        totalEarnings: totalEarnings.toFixed(2),
        ratings,
    };
}
