import { ok, fail } from "../../../api/_lib/response";
import { getStoreDashboardData } from "@/lib/services/dashboard.service";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return fail("Unauthorized", 401);
        }
        const { searchParams } = new URL(request.url);
        const storeId = searchParams.get("storeId");
        if (!storeId) {
            return ok({
                totalProducts: 0,
                totalOrders: 0,
                totalEarnings: "0.00",
                ratings: [],
            });
        }
        const data = await getStoreDashboardData(storeId || "default", { userId });
        return ok(data);
    } catch {
        return fail("Failed to load store dashboard", 500);
    }
}
