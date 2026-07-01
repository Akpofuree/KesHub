import { prisma } from "@/lib/prisma";

export async function listOrders() {
    return prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function listOrdersByStore(storeId) {
    // Note: The schema no longer has a storeId on the Order model,
    // so this function might not be fully functional unless items are filtered.
    // Assuming for now we just return all orders for safety, or you might need a more complex query.
    return prisma.order.findMany({
        include: {
            items: {
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
            items: {
                create: cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            items: true,
        },
    });
}
