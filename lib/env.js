import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    DIRECT_URL: z.string().min(1).optional(),
    NEXTAUTH_SECRET: z.string().min(1).optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXT_PUBLIC_CURRENCY_SYMBOL: z.string().min(1).default("$"),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string().min(1).optional(),
    KESHUB_KEY_NAME: z.string().min(1).optional(),
    KESHUB_API_KEY: z.string().min(1).optional(),
    KESHUB_PRODUCT_ENVIRONMENT: z.string().min(1).optional(),
    KESHUB_SECRET_KEY: z.string().min(1).optional(),
    ADMIN_SIGNUP_CODE: z.string().min(1).optional(),
});

export function getEnv() {
    return envSchema.parse({
        DATABASE_URL: process.env.DATABASE_URL,
        DIRECT_URL: process.env.DIRECT_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_CURRENCY_SYMBOL: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
        NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        KESHUB_KEY_NAME: process.env.KESHUB_KEY_NAME,
        KESHUB_API_KEY: process.env.KESHUB_API_KEY,
        KESHUB_PRODUCT_ENVIRONMENT: process.env.KESHUB_PRODUCT_ENVIRONMENT,
        KESHUB_SECRET_KEY: process.env.KESHUB_SECRET_KEY,
        ADMIN_SIGNUP_CODE: process.env.ADMIN_SIGNUP_CODE,
    });
}
