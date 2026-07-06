import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribe-success?error=missing_token", request.url));
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      return NextResponse.redirect(new URL("/unsubscribe-success?error=invalid_token", request.url));
    }

    if (!subscriber.isActive) {
      // Already unsubscribed
      return NextResponse.redirect(new URL("/unsubscribe-success?status=already_unsubscribed", request.url));
    }

    // Unsubscribe the user
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    // Redirect to the success page
    return NextResponse.redirect(new URL("/unsubscribe-success?status=success", request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(new URL("/unsubscribe-success?error=server_error", request.url));
  }
}
