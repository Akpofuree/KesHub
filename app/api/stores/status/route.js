import { auth } from "@clerk/nextjs/server";
import { fail, ok } from "../../_lib/response";
import { withRlsContext } from "@/lib/rls";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return fail("Unauthorized", 401);
    }

    const store = await withRlsContext({ userId }, async (tx) =>
      tx.store.findUnique({
        where: { userId },
        include: { user: true },
      })
    );

    return ok(store);
  } catch {
    return fail("Failed to load store status", 500);
  }
}
