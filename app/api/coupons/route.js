import { fail, ok } from "../_lib/response";
import { createCoupon, deleteCoupon, listCoupons } from "@/lib/services/coupon.service";
import { z } from "zod";

const couponSchema = z.object({
    code: z.string().min(1),
    description: z.string().min(1),
    discount: z.coerce.number().min(1).max(100),
    forNewUser: z.coerce.boolean().default(false),
    forMember: z.coerce.boolean().default(false),
    isPublic: z.coerce.boolean().default(false),
    expiresAt: z.coerce.date(),
});

export async function GET() {
    const coupons = await listCoupons();
    return ok(coupons);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const data = couponSchema.parse(body);
        const coupon = await createCoupon(data);
        return ok(coupon, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return fail("Invalid coupon payload", 400, error.flatten());
        }
        return fail("Failed to create coupon", 500);
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    if (!code) return fail("Coupon code is required", 400);

    try {
        const coupon = await deleteCoupon(code);
        return ok(coupon);
    } catch {
        return fail("Failed to delete coupon", 500);
    }
}

