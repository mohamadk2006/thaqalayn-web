// Regenerates the typed API schema from the live backend.
// Keeps only the public /api/* read endpoints the web uses (drops /admin/*, /download, sync endpoints),
// saves a snapshot (lib/api/openapi.json) and generates lib/api/schema.d.ts with openapi-typescript.
// Run: npm run gen:api
import { writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = process.env.API_BASE_URL ?? "https://api.thaqalaynlibrary.com";
const excluded = ["/api/books/{book_id}/download", "/api/catalog/version", "/api/books/changes"];

const spec = await (await fetch(`${base}/openapi.json`)).json();

spec.paths = Object.fromEntries(
  Object.entries(spec.paths).filter(([p]) => p.startsWith("/api/") && !excluded.includes(p)),
);

// Drop schemas no longer referenced (admin form bodies etc.), following nested $refs.
const used = new Set();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "$ref" && typeof v === "string") {
      const name = v.split("/").pop();
      if (!used.has(name)) {
        used.add(name);
        walk(spec.components.schemas[name]);
      }
    } else walk(v);
  }
};
walk(spec.paths);
spec.components.schemas = Object.fromEntries(
  Object.entries(spec.components.schemas).filter(([name]) => used.has(name)),
);

const snapshot = path.join(root, "lib/api/openapi.json");
await writeFile(snapshot, JSON.stringify(spec, null, 2) + "\n");
execFileSync("npx", ["openapi-typescript", snapshot, "-o", path.join(root, "lib/api/schema.d.ts")], {
  stdio: "inherit",
  cwd: root,
});
console.log(`${Object.keys(spec.paths).length} paths, ${used.size} schemas`);
