import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "ratelimit:auth",
    })
  : null;

export async function checkAuthLimit(identifier) {
  if (!authLimiter) {
    return { success: true };
  }

  return authLimiter.limit(identifier);
}
