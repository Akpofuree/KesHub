import { fail, ok } from "../../../_lib/response";
import { updateProductStock } from "@/lib/services/product.service";
import { z } from "zod";

const stockSchema = z.object({
    inStock: z.coerce.boolean(),
});

export async function PATCH(request, { params }) {
    try {
        const body = await request.json();
        const { inStock } = stockSchema.parse(body);
        const product = await updateProductStock(params.productId, inStock);
        return ok(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid stock payload", 400, error.flatten());
        }
        return fail("Failed to update product stock", 500);
    }
}

