import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, subject, message } = result.data;
    const adminEmail = process.env.ADMIN_EMAIL || "akpofurediegbe@gmail.com";

    // Send email to admin
    await resend.emails.send({
      from: "KESHUB Contact <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #4f46e5; margin-bottom: 24px;">New Contact Form Submission</h2>
          
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;"><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #6b7280;"><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f3f4f6; padding: 16px; rounded: 6px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">This message was sent from the KESHUB contact page.</p>
        </div>
      `,
      replyTo: email, // This allows the admin to reply directly to the customer
    });

    return NextResponse.json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
