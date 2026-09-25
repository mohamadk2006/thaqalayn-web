import type { paths } from "./schema";

// Low-level typed GET for the public API. Isomorphic: server code calls it through the cached
// functions in ./server.ts; browser code (search, page turns) calls it directly.

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.thaqalaynlibrary.com"
).replace(/\/$/, "");

type ApiPath = keyof paths;

type Op<P extends ApiPath> = paths[P]["get"];
type PathParams<P extends ApiPath> = Op<P> extends { parameters: { path: infer T } } ? T : never;
type QueryParams<P extends ApiPath> = Op<P> extends { parameters: { query?: infer T } } ? T : never;
type Json<P extends ApiPath> = Op<P> extends {
  responses: { 200: { content: { "application/json": infer T } } };
}
  ? T
  : never;

type Options<P extends ApiPath> = ([PathParams<P>] extends [never] | [undefined]
  ? { path?: never }
  : { path: PathParams<P> }) & {
  query?: QueryParams<P>;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    readonly detail?: string,
  ) {
    super(`API ${status} for ${url}${detail ? `: ${detail}` : ""}`);
    this.name = "ApiError";
  }
}

const TIMEOUT_MS = 15_000;

export function apiUrl(path: ApiPath, opts?: { path?: object; query?: object }): string {
  let p: string = path;
  for (const [k, v] of Object.entries(opts?.path ?? {})) {
    p = p.replace(`{${k}}`, encodeURIComponent(String(v)));
  }
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(opts?.query ?? {})) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const q = qs.toString();
  return `${API_BASE_URL}${p}${q ? `?${q}` : ""}`;
}

export async function apiGet<P extends ApiPath>(path: P, opts?: Options<P>): Promise<Json<P>> {
  const url = apiUrl(path, opts as { path?: object; query?: object } | undefined);
  const signal = opts?.signal
    ? AbortSignal.any([opts.signal, AbortSignal.timeout(TIMEOUT_MS)])
    : AbortSignal.timeout(TIMEOUT_MS);
  const res = await fetch(url, { headers: { Accept: "application/json" }, signal });
  if (!res.ok) {
    let detail: string | undefined;
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      // non-JSON error body
    }
    throw new ApiError(res.status, url, detail);
  }
  return res.json() as Promise<Json<P>>;
}

/** Parses a numeric id from a URL segment; null if it is not a positive integer. */
export function parseId(value: string | number): number | null {
  const n = typeof value === "number" ? value : /^\d{1,12}$/.test(value) ? Number(value) : NaN;
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}

/** Like apiGet, but resolves to null on 404 (so pages can call notFound()). */
export async function apiGetOrNull<P extends ApiPath>(path: P, opts?: Options<P>): Promise<Json<P> | null> {
  try {
    return await apiGet(path, opts);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}
