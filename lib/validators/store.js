import { z } from "zod";

export const storeCreateSchema = z.object({
    userId: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    username: z.string().min(1),
    address: z.string().min(1),
    logo: z.string().min(1),
    email: z.string().email(),
    contact: z.string().min(1),
});

export const storeApprovalSchema = z.object({
    storeId: z.string().min(1),
    status: z.enum(["approved", "rejected"]),
});

export const storeActiveSchema = z.object({
    storeId: z.string().min(1),
    isActive: z.coerce.boolean(),
});

