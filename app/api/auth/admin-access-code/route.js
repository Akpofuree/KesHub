import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    code: z.string().min(1),
});

export async function POST(request) {
    try {
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
