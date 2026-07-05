import { NextResponse } from "next/server";
import { Webhook } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = await req.json();
    const evt = payload.data;

    // Verify the webhook signature
    const signature = req.headers.get("clerk-webhook-signature");
    const verified = await webhook.verify(JSON.stringify(payload), {
      signature,
    });

    if (!verified) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle user created event
    if (payload.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = evt;

      const primaryEmail = email_addresses.find((e) => e.id === evt.primary_email_address_id)?.email_address;

      await prisma.user.create({
        data: {
          id,
          email: primaryEmail,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          image: image_url || "",
          role: "BUYER",
        },
      });
    }

    // Handle user updated event
    if (payload.type === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt;

      const primaryEmail = email_addresses.find((e) => e.id === evt.primary_email_address_id)?.email_address;

      await prisma.user.update({
        where: { id },
        data: {
          email: primaryEmail,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          image: image_url || "",
        },
      });
    }

    // Handle user deleted event
    if (payload.type === "user.deleted") {
      const { id } = evt;
      await prisma.user.delete({
        where: { id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
