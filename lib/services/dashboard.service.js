import { withRlsContext } from "@/lib/rls";

export async function getAdminDashboardData(ctx = {}) {
    const [products, stores, orders, allOrders] = await withRlsContext({ userId: ctx.userId }, async (tx) =>
        Promise.all([
            tx.product.count(),
            tx.store.count(),
            tx.order.count(),
            tx.order.findMany({
                select: {
                    createdAt: true,
                    totalAmount: true,
                },
                orderBy: { createdAt: "asc" },
            }),
        ])
    );

    const revenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
        products,
        stores,
        orders,
        revenue: revenue.toFixed(2),
        allOrders,
    };
}

export async function getStoreDashboardData(storeId, ctx = {}) {
    const [totalProducts, orders, ratings] = await withRlsContext({ userId: ctx.userId, storeId }, async (tx) =>
        Promise.all([
            tx.product.count({ where: { storeId } }),
            tx.order.findMany({
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
            tx.rating.findMany({
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
        ])
    );

    const totalOrders = orders.length;
    const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
        totalProducts,
        totalOrders,
        totalEarnings: totalEarnings.toFixed(2),
        ratings,
    };
}
