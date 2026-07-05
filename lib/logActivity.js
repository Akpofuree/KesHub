import { prisma } from "./prisma";

export async function logActivity({ userId, action, entityType, entityId, metadata }) {
  try {
    await prisma.activityLog.create({
      data: { userId, action, entityType, entityId, metadata },
    });
  } catch (err) {
    console.error("Activity log failed:", err);
    // Never let logging break the real operation
  }
}
