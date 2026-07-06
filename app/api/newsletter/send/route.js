import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import WeeklyNewsletter from "@/emails/weekly-newsletter";

// Resend initialization
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Optional: Add a simple secret key check here so only you/cron can trigger it
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      // Skipping strict auth for local testing right now, but good to have in production
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers found." });
    }

    // Fetch top 5 featured products to include in the email
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      take: 5,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let sentCount = 0;
    const errors = [];

    for (const sub of subscribers) {
      const { error } = await resend.emails.send({
        from: "KESHUB <onboarding@resend.dev>",
        to: sub.email,
        subject: "This Week on KESHUB 🔥",
        react: WeeklyNewsletter({
          products,
          unsubscribeUrl: `${baseUrl}/api/newsletter/unsubscribe?token=${sub.unsubscribeToken}`,
        }),
      });

      if (error) {
        console.error(`Failed to send to ${sub.email}:`, error);
        errors.push({ email: sub.email, error: error.message });
      } else {
        sentCount++;
      }

      // Small delay to respect Resend rate limits (2 emails/sec on free tier)
      await new Promise((r) => setTimeout(r, 500));
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
      { status: 500 }
    );
  }
}
