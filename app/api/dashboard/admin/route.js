import { ok, fail } from "../../../api/_lib/response";
import { getAdminDashboardData } from "@/lib/services/dashboard.service";

export async function GET() {
    try {
        const data = await getAdminDashboardData();
        return ok(data);
    } catch {
        return fail("Failed to load admin dashboard", 500);
    }
}

