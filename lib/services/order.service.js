import { prisma } from "@/lib/prisma";

export async function listOrders() {
    return prisma.order.findMany({
        include: {
            user: true,
            store: true,
            address: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function listOrdersByStore(storeId) {
    return prisma.order.findMany({
        where: { storeId },
        include: {
            user: true,
            address: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function updateOrderStatus(orderId, status) {
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
}

export async function createOrder({ userId, storeId, addressId, cartItems, total, paymentMethod = "PAYSTACK" }) {
    return prisma.order.create({
        data: {
            userId,
            storeId,
            addressId,
            total,
            paymentMethod,
            isPaid: false,
            status: "ORDER_PLACED",
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
    });
}
