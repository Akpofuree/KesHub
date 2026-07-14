import { fail, ok } from "../../_lib/response";
import { listOrdersByStore, updateOrderStatus } from "@/lib/services/order.service";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

const orderStatusSchema = z.object({
    orderId: z.string().min(1),
    status: z.enum(["ORDER_PLACED", "PROCESSING", "SHIPPED", "DELIVERED"]),
});

export async function GET(request) {
    const { userId } = await auth();
    if (!userId) {
        return fail("Unauthorized", 401);
    }
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");
    const orders = await listOrdersByStore(storeId || "default", { userId });
    return ok(orders);
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { orderId, status } = orderStatusSchema.parse(body);
        const { userId } = await auth();
        if (!userId) {
            return fail("Unauthorized", 401);
        }
        const order = await updateOrderStatus(orderId, status, { userId, storeId: body.storeId });
        return ok(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid order payload", 400, error.flatten());
        }
        return fail("Failed to update order", 500);
    }
}
