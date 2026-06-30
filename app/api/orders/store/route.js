import { fail, ok } from "../../_lib/response";
import { listOrdersByStore, updateOrderStatus } from "@/lib/services/order.service";
import { z } from "zod";

const orderStatusSchema = z.object({
    orderId: z.string().min(1),
    status: z.enum(["ORDER_PLACED", "PROCESSING", "SHIPPED", "DELIVERED"]),
});

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");
    const orders = await listOrdersByStore(storeId || "default");
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

