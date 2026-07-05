import { prisma } from "@/lib/prisma";

export async function listOrders() {
    return prisma.order.findMany({
        include: {
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
    });
}

export async function updateOrderStatus(orderId, status) {
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
}

export async function createOrder({ customerName, customerEmail, customerPhone, address, cartItems, total, paymentMethod = "PAYSTACK" }) {
    return prisma.order.create({
        data: {
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
    });
}
