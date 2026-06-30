import { z } from "zod";

export const productCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    brand: z.string().min(1),
    storage: z.string().min(1),
    deviceType: z.string().min(1),
    deviceState: z.string().min(1),
    grade: z.string().min(1),
    simStatus: z.string().min(1),
    usageType: z.string().min(1),
    mrp: z.coerce.number().nonnegative(),
    price: z.coerce.number().nonnegative(),
    images: z.array(z.string().min(1)).min(1),
    category: z.string().min(1),
    storeId: z.string().min(1),
    inStock: z.coerce.boolean().optional(),
});

export const productUpdateSchema = productCreateSchema.partial().extend({
    id: z.string().min(1),
});
