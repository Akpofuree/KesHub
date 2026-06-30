import { ok, fail } from "../../../api/_lib/response";
import { getStoreDashboardData } from "@/lib/services/dashboard.service";

export async function GET(request) {
    try {
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
        const data = await getStoreDashboardData(storeId || "default");
        return ok(data);
    } catch {
        return fail("Failed to load store dashboard", 500);
    }
}
