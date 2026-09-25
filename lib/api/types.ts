import type { components } from "./schema";

type Schemas = components["schemas"];

export type Author = Schemas["AuthorOut"];
export type Book = Schemas["BookOut"];
export type Category = Schemas["CategoryOut"];
export type Language = Schemas["LanguageOut"];
export type Library = Schemas["LibraryOut"];
export type Subject = Schemas["SubjectOut"];
export type Work = Schemas["WorkOut"];
export type WorkDetail = Schemas["WorkDetailOut"];
export type Toc = Schemas["TocResponse"];
export type TocEntry = Schemas["TocEntryOut"];
export type SearchHit = Schemas["SearchHit"];
export type TocHit = Schemas["TocHit"];
export type TocSearchResult = Schemas["TocSearchResponse"];

export type Paged<T> = { page: number; limit: number; total: number; items: T[] };

/** `section` of a category: "shia" → الكتب الشيعية, "other" → الكتب الأخرى. */
export type CategorySection = "shia" | "other";

// The backend schema leaves `PageResponse.page` untyped; this matches the live API
// and BRIEF §4 (content schema v2). Unknown block types must be skipped by the reader.
export type BlockType = "text" | "heading" | "footnotes";

export type Block = {
  /** Stable paragraph id, e.g. "p-000078-b-003". */
  id: string;
  type: BlockType | (string & {});
  order: number;
  text: string;
  tocId?: string | null;
};

export type Page = {
  /** e.g. "p-000078" */
  id: string;
  /** Stable 1-based reading order — the key for URLs and navigation. */
  sequence: number;
  isBlank: boolean;
  blocks: Block[];
  printedPage: number | null;
  /** Label as printed in the source, e.g. "المقدمة 30". */
  sourcePageLabel: string | null;
  pageType: "main" | "frontMatter" | (string & {});
  /** Display only, not unique ("0.30" for front matter). */
  pageNumber: string;
};

export type PageResponse = Omit<Schemas["PageResponse"], "page"> & { page: Page };

/** Full-text search caps `total` at this value and has no `capped` flag (plan §3). */
export const SEARCH_TOTAL_CAP = 5000;
