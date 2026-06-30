import { prisma } from "@/lib/prisma";

export async function listCoupons() {
    return prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createCoupon(data) {
    return prisma.coupon.create({
        data,
    });
}

export async function deleteCoupon(code) {
    return prisma.coupon.delete({
        where: { code },
    });
}

