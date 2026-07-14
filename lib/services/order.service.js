import { withRlsContext } from "@/lib/rls";

export async function listOrders(ctx = {}) {
    return withRlsContext({ userId: ctx.userId }, async (tx) =>
        tx.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
    );
}

export async function listOrdersByStore(storeId, ctx = {}) {
    return withRlsContext({ userId: ctx.userId, storeId }, async (tx) =>
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
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
    );
}

export async function updateOrderStatus(orderId, status, ctx = {}) {
    return withRlsContext({ userId: ctx.userId, storeId: ctx.storeId }, async (tx) =>
        tx.order.update({
            where: { id: orderId },
            data: { status },
        })
    );
}

export async function createOrder({ customerName, customerEmail, customerPhone, address, cartItems, total, paymentMethod = "PAYSTACK", userId }) {
    return withRlsContext({ userId }, async (tx) =>
        tx.order.create({
            data: {
                userId,
                customerName,
                customerEmail,
                customerPhone,
                address,
                totalAmount: total,
                status: "PENDING",
                orderItems: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                orderItems: true,
            },
        })
    );
}
