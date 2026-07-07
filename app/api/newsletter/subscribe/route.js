import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Count total active subscribers for the notification
    const totalSubscribers = await prisma.newsletterSubscriber.count({
      where: { isActive: true },
    });

    // Fire-and-forget admin notification — don't block the response
    const adminEmail = process.env.ADMIN_EMAIL || "akpofurediegbe@gmail.com";
    resend.emails.send({
      from: "KESHUB <onboarding@resend.dev>",
      to: adminEmail,
      subject: `🎉 New newsletter subscriber: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #1FCB5E; margin-bottom: 4px;">New Subscriber!</h2>
          <p style="color: #374151; font-size: 16px; margin-top: 0;">Someone just joined the KESHUB newsletter.</p>
          <div style="background: white; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Email address</p>
            <p style="margin: 4px 0 0; font-size: 18px; font-weight: 600; color: #111827;">${email}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Total active subscribers: <strong style="color: #111827;">${totalSubscribers}</strong></p>
        </div>
      `,
    }).catch((err) => {
      // Log but don't fail the user's request if notification fails
      console.error("Admin notification failed:", err);
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
