import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Upsert so if they unsubscribed before, we can re-activate them
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        isActive: true,
        unsubscribedAt: null,
      },
      create: {
        email,
        isActive: true,
      },
    });

    return NextResponse.json({
      message: "Successfully subscribed to the newsletter!",
      subscriber: { id: subscriber.id, email: subscriber.email },
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
