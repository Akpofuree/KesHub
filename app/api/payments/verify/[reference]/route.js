import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function markPaidOrder(order, reference) {
    if (!order) return null;
    if (order.isPaid) return order;

    return prisma.order.update({
        where: { id: order.id },
        data: {
            status: "PAID",
            isPaid: true,
            paystackReference: reference,
        },
        include: {
            user: true,
            store: true,
            address: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
}

export async function GET(_request, { params }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { reference } = params;

        if (!process.env.PAYSTACK_SECRET_KEY) {
            return NextResponse.json(
                { success: false, message: "PAYSTACK_SECRET_KEY is not configured" },
                { status: 500 }
            );
        }

        const paystackResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = await paystackResponse.json();

        if (!paystackResponse.ok || !data?.status) {
            return NextResponse.json(
                { success: false, message: data?.message || "Failed to verify payment" },
                { status: paystackResponse.status || 500 }
            );
        }

        const transaction = data.data;
        const orderId = transaction?.metadata?.orderId;
        const order = orderId ? await prisma.order.findUnique({ where: { id: orderId } }) : null;

        if (order && order.userId !== userId) {
            return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }

        if (transaction?.status !== "success") {
            return NextResponse.json(
                { success: false, message: "Payment failed", data: { transactionStatus: transaction.status } },
                { status: 400 }
            );
        }

        const updatedOrder = orderId ? await markPaidOrder(order, reference) : null;

        return NextResponse.json({
            success: true,
            data: {
                transactionStatus: transaction.status,
                order: updatedOrder || order,
                orderId,
                transaction,
                status: updatedOrder?.status || order?.status || transaction.status,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
