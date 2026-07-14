import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createBreaker } from "@/lib/circuit-breaker";
import { withRlsContext } from "@/lib/rls";

const initializeSchema = z.object({
    email: z.string().email(),
    orderId: z.string().min(1),
});

const paystackInitializeBreaker = createBreaker(async ({ email, amount, metadata, callbackUrl }) => {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            amount,
            metadata,
            callback_url: callbackUrl,
        }),
    });

    const data = await response.json();
    return { response, data };
});

export async function POST(request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.PAYSTACK_SECRET_KEY) {
            return NextResponse.json(
                { success: false, message: "PAYSTACK_SECRET_KEY is not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { email, orderId } = initializeSchema.parse(body);
        const order = await withRlsContext({ userId }, async (tx) =>
            tx.order.findUnique({ where: { id: orderId } })
        );

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
            ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`
            : new URL("/payment/verify", request.url).toString();

        const { response: paystackResponse, data } = await paystackInitializeBreaker.fire({
            email,
            amount: Math.round(order.totalAmount * 100),
            metadata: { orderId },
            callbackUrl,
        });

        if (!paystackResponse.ok || !data?.status) {
            return NextResponse.json(
                { success: false, message: data?.message || "Failed to initialize payment" },
                { status: paystackResponse.status || 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                authorization_url: data.data.authorization_url,
                reference: data.data.reference,
            },
        });
    } catch (error) {
        if (error?.code === "EOPENBREAKER" || error?.code === "ETIMEDOUT") {
            return NextResponse.json(
                { success: false, message: "Payment service temporarily unavailable" },
                { status: 503 }
            );
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: "Invalid payment payload", details: error.flatten() },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to initialize payment" },
            { status: 500 }
        );
    }
}
