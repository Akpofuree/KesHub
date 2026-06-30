import { fail, ok } from "../../_lib/response";
import { prisma } from "@/lib/prisma";

export async function GET(_request, { params }) {
    try {
        const { productId } = params;

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                store: true,
                rating: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!product) {
            return fail("Product not found", 404);
        }

        return ok(product);
    } catch {
        return fail("Failed to load product", 500);
    }
}

export async function PATCH(request, { params }) {
    try {
        const { productId } = params;
        const body = await request.json();
        const { name, description, brand, storage, deviceType, deviceState, grade, simStatus, usageType, mrp, price, images, category, inStock } = body;

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                ...(name !== undefined ? { name } : {}),
                ...(description !== undefined ? { description } : {}),
                ...(brand !== undefined ? { brand } : {}),
                ...(storage !== undefined ? { storage } : {}),
                ...(deviceType !== undefined ? { deviceType } : {}),
                ...(deviceState !== undefined ? { deviceState } : {}),
                ...(grade !== undefined ? { grade } : {}),
                ...(simStatus !== undefined ? { simStatus } : {}),
                ...(usageType !== undefined ? { usageType } : {}),
                ...(mrp !== undefined ? { mrp } : {}),
                ...(price !== undefined ? { price } : {}),
                ...(images !== undefined ? { images } : {}),
                ...(category !== undefined ? { category } : {}),
                ...(inStock !== undefined ? { inStock } : {}),
            },
        });

        return ok(product);
    } catch {
        return fail("Failed to update product", 500);
    }
}

export async function DELETE(_request, { params }) {
    try {
        const { productId } = params;

        const product = await prisma.product.delete({
            where: { id: productId },
        });

        return ok(product);
    } catch {
        return fail("Failed to remove product", 500);
    }
}
