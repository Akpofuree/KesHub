import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

async function setSessionVariables(tx, userId, sessionId, storeId) {
  if (userId) {
    await tx.$executeRaw(
      Prisma.sql`SELECT set_config('app.current_user_id', ${userId}, true)`
    );
  }

  if (sessionId) {
    await tx.$executeRaw(
      Prisma.sql`SELECT set_config('app.current_session_id', ${sessionId}, true)`
    );
  }

  if (storeId) {
    await tx.$executeRaw(
      Prisma.sql`SELECT set_config('app.current_store_id', ${storeId}, true)`
    );
  }
}

export async function withRlsContext({ userId, sessionId, storeId } = {}, fn) {
  return prisma.$transaction(async (tx) => {
    await setSessionVariables(tx, userId, sessionId, storeId);
    return fn(tx);
  });
}
