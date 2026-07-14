import { ok, fail } from "../../../api/_lib/response";
import { getAdminDashboardData } from "@/lib/services/dashboard.service";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return fail("Unauthorized", 401);
        }
        const data = await getAdminDashboardData({ userId });
        return ok(data);
    } catch {
        return fail("Failed to load admin dashboard", 500);
    }
}
