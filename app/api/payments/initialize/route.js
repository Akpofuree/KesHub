import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const initializeSchema = z.object({
    email: z.string().email(),
    orderId: z.string().min(1),
});

export async function POST(request) {
    try {
        const { userId } = auth();
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
        const order = await prisma.order.findUnique({ where: { id: orderId } });

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        if (order.userId !== userId) {
            return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }

        const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
            ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`
            : new URL("/payment/verify", request.url).toString();

        const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Math.round(order.total * 100),
                metadata: { orderId },
                callback_url: callbackUrl,
            }),
        });

        const data = await paystackResponse.json();

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
