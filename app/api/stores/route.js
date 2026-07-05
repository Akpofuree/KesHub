import { fail, ok } from "../_lib/response";
import { createStore, listStores } from "@/lib/services/store.service";
import { storeCreateSchema } from "@/lib/validators/store";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  try {
    const stores = await listStores();
    return ok(stores);
  } catch {
    return fail("Failed to load stores", 500);
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return fail("Unauthorized", 401);
    }

    const body = await request.json();
    const data = storeCreateSchema.parse({ ...body, userId });

    // Check if user exists in database, if not create them
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      const clerkUser = await fetch(
        `https://api.clerk.com/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        },
      ).then((res) => res.json());

      const primaryEmail = clerkUser.email_addresses?.find(
        (e) => e.id === clerkUser.primary_email_address_id,
      )?.email_address;

      await prisma.user.create({
        data: {
          id: userId,
          email:
            primaryEmail || clerkUser.email_addresses?.[0]?.email_address || "",
          name:
            `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim() ||
            "User",
          image: clerkUser.image_url || "",
          role: "BUYER",
        },
      });
    }

    const existingStore = await prisma.store.findUnique({
      where: { userId },
    });
    if (existingStore) {
      return fail("You already have a store application", 409);
    }

    const store = await createStore(data);
    return ok(store, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return fail("Invalid store payload", 400, error.flatten());
    }
    return fail("Failed to create store", 500);
  }
}
