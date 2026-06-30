import { fail, ok } from "../_lib/response";
import { createStore, listStores } from "@/lib/services/store.service";
import { storeCreateSchema } from "@/lib/validators/store";
import { z } from "zod";

export async function GET() {
    try {
        const stores = await listStores();
        return ok(stores);
    } catch {
        return fail("Failed to load stores", 500);
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const data = storeCreateSchema.parse(body);
        const store = await createStore(data);
        return ok(store, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid store payload", 400, error.flatten());
        }
        return fail("Failed to create store", 500);
    }
}
