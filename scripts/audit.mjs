import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function walk(dir, results = []) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
            await walk(full, results);
        } else {
            results.push(full);
        }
    }
    return results;
}

async function main() {
    const files = await walk(root);
    const summary = {
        appRoutes: files.filter((f) => f.includes(`${path.sep}app${path.sep}`) && f.includes("route.js")).length,
        apiRoutes: files.filter((f) => f.includes(`${path.sep}app${path.sep}api${path.sep}`) && f.includes("route.js")).length,
        services: files.filter((f) => f.includes(`${path.sep}lib${path.sep}services${path.sep}`)).length,
        validators: files.filter((f) => f.includes(`${path.sep}lib${path.sep}validators${path.sep}`)).length,
        prismaModels: (await readFile(path.join(root, "prisma", "schema.prisma"), "utf8")).match(/model\s+\w+/g)?.length || 0,
    };

    console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
