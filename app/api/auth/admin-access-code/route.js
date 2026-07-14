import { NextResponse } from "next/server";
import { z } from "zod";
import { checkAuthLimit } from "@/lib/rate-limit";

const schema = z.object({
    code: z.string().min(1),
});

export async function POST(request) {
    try {
        const forwardedFor = request.headers.get("x-forwarded-for") || "";
        const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
        const limitResult = await checkAuthLimit(`admin-access-code:${clientIp}`);

        if (!limitResult.success) {
            return NextResponse.json(
                { success: false, message: "Too many attempts. Please wait a minute and try again." },
                { status: 429 }
            );
        }

        const { code } = schema.parse(await request.json());
        if (!process.env.ADMIN_SIGNUP_CODE) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (code !== process.env.ADMIN_SIGNUP_CODE) {
            return NextResponse.json({ success: false, message: "Invalid access code" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, message: "Invalid access code" }, { status: 400 });
    }
}
