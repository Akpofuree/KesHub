export async function fetchJson(input, init) {
    const response = await fetch(input, init);
    const contentType = response.headers.get("content-type") || "";
    let data = null;

    if (contentType.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    } else {
        const text = await response.text();
        data = text ? { raw: text } : null;
    }

    return {
        ok: response.ok,
        status: response.status,
        data,
    };
}

