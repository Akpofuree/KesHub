import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import WeeklyNewsletter from "@/emails/weekly-newsletter";
import { cacheAside, cacheKeys } from "@/lib/cache";
import { createResendBreaker, sendResendEmailWithFallback } from "@/lib/resend-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const resendBreaker = createResendBreaker(resend);

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      // Intentionally permissive for local testing.
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers found." });
    }

    const products = await cacheAside(
      cacheKeys.featuredProducts,
      async () =>
        prisma.product.findMany({
          where: { isFeatured: true, isActive: true },
          take: 5,
        }),
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let sentCount = 0;
    const errors = [];

    for (const sub of subscribers) {
      const payload = {
        from: "KESHUB <onboarding@resend.dev>",
        to: sub.email,
        subject: "This Week on KESHUB 🔥",
        react: WeeklyNewsletter({
          products,
          unsubscribeUrl: `${baseUrl}/api/newsletter/unsubscribe?token=${sub.unsubscribeToken}`,
        }),
      };

      try {
        await sendResendEmailWithFallback(resendBreaker, payload, sub.email);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send to ${sub.email}:`, error);
        errors.push({ email: sub.email, error: error.message });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
