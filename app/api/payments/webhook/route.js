import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
    const signature = request.headers.get("x-paystack-signature");
    const rawBody = await request.text();
    const secret = process.env.PAYSTACK_SECRET_KEY || "";
    const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
    const signatureBuffer = Buffer.from(signature || "", "hex");
    const hashBuffer = Buffer.from(hash, "hex");
    const signatureMatches =
        signatureBuffer.length === hashBuffer.length &&
        crypto.timingSafeEqual(signatureBuffer, hashBuffer);

    if (!signature || !signatureMatches) {
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    try {
        const event = JSON.parse(rawBody);

        if (event?.event === "charge.success") {
            const orderId = event?.data?.metadata?.orderId;
            if (orderId) {
                const order = await prisma.order.findUnique({ where: { id: orderId } });
                if (order && !order.isPaid) {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: {
                            status: "PAID",
                            isPaid: true,
                            paystackReference: event?.data?.reference || null,
                        },
                    });
                }
            }
        }
    } catch (_error) {
        // Always return 200 so Paystack stops retrying.
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
