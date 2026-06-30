import { fail, ok } from "../_lib/response";
import { createOrder, listOrders, updateOrderStatus } from "@/lib/services/order.service";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const orderStatusSchema = z.object({
    orderId: z.string().min(1),
    status: z.enum(["ORDER_PLACED", "PROCESSING", "SHIPPED", "DELIVERED"]),
});

const cartItemSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
});

const createOrderSchema = z.object({
    storeId: z.string().min(1),
    addressId: z.string().min(1),
    cartItems: z.array(cartItemSchema).min(1),
    total: z.number().positive(),
});

export async function GET() {
    const orders = await listOrders();
    return ok(orders);
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { orderId, status } = orderStatusSchema.parse(body);
        const order = await updateOrderStatus(orderId, status);
        return ok(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid order payload", 400, error.flatten());
        }
        return fail("Failed to update order", 500);
    }
}

export async function POST(request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return fail("Unauthorized", 401);
        }

        const body = await request.json();
        const { storeId, addressId, cartItems, total } = createOrderSchema.parse(body);
        const order = await createOrder({
            userId,
            storeId,
            addressId,
            cartItems,
            total,
            paymentMethod: "PAYSTACK",
        });

        return ok({ orderId: order.id, total: order.total }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid order payload", 400, error.flatten());
        }
        return fail("Failed to create order", 500);
    }
}
