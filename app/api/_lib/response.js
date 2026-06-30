import { NextResponse } from "next/server";

export function ok(data, init = {}) {
    return NextResponse.json({ success: true, data }, init);
}

export function fail(message, status = 400, details = null) {
    return NextResponse.json(
        { success: false, message, details },
        { status }
    );
}

