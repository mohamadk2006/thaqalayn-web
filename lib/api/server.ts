import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { apiGet, apiGetOrNull, parseId } from "./client";
import type { paths } from "./schema";
import type { PageResponse } from "./types";

// Cached, server-only data access for server components (plan §2: server → API directly, no CORS).
// Lifetimes are the custom profiles in next.config.ts:
//   "catalog" — lists and filters (~10 min, plan §4 ISR)
//   "content" — one book/work, its TOC and pages (daily; content rarely changes)
// Tags allow on-demand revalidation later: "catalog", "work:<id>", "book:<id>".
// Ids are strings (as in URLs and API responses). Functions that return `| null` resolve to null
// on 404 or a malformed id — callers should notFound().

type Query<P extends keyof paths> = paths[P]["get"] extends { parameters: { query?: infer Q } } ? Q : never;

export type WorksQuery = Query<"/api/works">;
export type BooksQuery = Query<"/api/books">;

// Catalog ------------------------------------------------------------------------------------

export async function getCategories() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  const categories = await apiGet("/api/categories");
  return categories.toSorted((a, b) => a.order - b.order);
}

export async function getLibraries() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  return apiGet("/api/libraries");
}

export async function getAuthors() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  return apiGet("/api/authors");
}

export async function getLanguages() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  return apiGet("/api/languages");
}

export async function getWorks(query: WorksQuery = {}) {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  return apiGet("/api/works", { query });
}

export async function getBooks(query: BooksQuery = {}) {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  return apiGet("/api/books", { query });
}

/** Featured works ("مختارات الكتب") in the order set in the admin panel. */
export async function getFeaturedWorks() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  const res = await apiGet("/api/works", { query: { featured: true, limit: 100 } });
  return res.items;
}

/** Categories with their number of works, empty ones dropped (e.g. "مخطوطات"), in server order. */
export async function getCategoriesWithCounts() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  const categories = await getCategories();
  const totals = await Promise.all(
    categories.map((c) => apiGet("/api/works", { query: { subject: c.id, limit: 1 } }).then((r) => r.total)),
  );
  return categories.map((c, i) => ({ ...c, workCount: totals[i] })).filter((c) => c.workCount > 0);
}

/** Totals for the home page. */
export async function getCatalogStats() {
  "use cache";
  cacheLife("catalog");
  cacheTag("catalog");
  const [books, authors] = await Promise.all([apiGet("/api/books", { query: { limit: 1 } }), getAuthors()]);
  return { books: books.total, authors: authors.length };
}

// Content ------------------------------------------------------------------------------------

export async function getWork(workId: string) {
  "use cache";
  cacheLife("content");
  cacheTag(`work:${workId}`);
  const id = parseId(workId);
  return id === null ? null : apiGetOrNull("/api/works/{work_id}", { path: { work_id: id } });
}

export async function getBook(bookId: string) {
  "use cache";
  cacheLife("content");
  cacheTag(`book:${bookId}`);
  const id = parseId(bookId);
  return id === null ? null : apiGetOrNull("/api/books/{book_id}", { path: { book_id: id } });
}

export async function getToc(bookId: string) {
  "use cache";
  cacheLife("content");
  cacheTag(`book:${bookId}`);
  const id = parseId(bookId);
  return id === null ? null : apiGetOrNull("/api/books/{book_id}/toc", { path: { book_id: id } });
}

export async function getPage(bookId: string, sequence: string | number) {
  "use cache";
  cacheLife("content");
  cacheTag(`book:${bookId}`);
  const id = parseId(bookId);
  const seq = parseId(sequence);
  if (id === null || seq === null) return null;
  const res = await apiGetOrNull("/api/books/{book_id}/pages/{sequence}", {
    path: { book_id: id, sequence: seq },
  });
  // The backend schema types `page` loosely; see Page in ./types.ts.
  return res as PageResponse | null;
}
