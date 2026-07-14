import { prisma } from "@/lib/prisma";
import { createBreaker } from "@/lib/circuit-breaker";

export function createResendBreaker(resend) {
  return createBreaker(async (payload) => resend.emails.send(payload));
}

export async function sendResendEmailWithFallback(
  resendBreaker,
  payload,
  recipient,
) {
  try {
    return await resendBreaker.fire(payload);
  } catch (error) {
    await prisma.failedEmail.create({
      data: {
        recipient,
        subject: payload.subject || "Unknown subject",
        payload,
      },
    });
    throw error;
  }
}
