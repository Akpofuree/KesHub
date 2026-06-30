import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

/**
 * Reuse a single Prisma client during development.
 * Next.js hot reload can create many module instances, so we keep one cached
 * client on the global object to avoid exhausting database connections.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
