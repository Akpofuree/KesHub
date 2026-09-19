import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function getRuntimeDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return databaseUrl;

  const url = new URL(databaseUrl);
  if (!url.searchParams.has("connect_timeout")) {
    url.searchParams.set("connect_timeout", "15");
  }
  if (!url.searchParams.has("pool_timeout")) {
    url.searchParams.set("pool_timeout", "15");
  }
  return url.toString();
}

/**
 * Reuse a single Prisma client during development.
 * Next.js hot reload can create many module instances, so we keep one cached
 * client on the global object to avoid exhausting database connections.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: getRuntimeDatabaseUrl() },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
