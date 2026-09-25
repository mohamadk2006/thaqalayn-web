import styles from "./book-cover.module.css";

// Generated typographic cover (design-system §5) — the API has no real covers yet.
const palette = ["#5b2a14", "#1f3b33", "#3b2f4f", "#6b4a16", "#243a52", "#4a2020"];

/** Deterministic colour per title, so a book always gets the same cover. */
export function coverColor(title: string): string {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

/** Strips editorial suffixes like "( مُشَكَّل )" from the title shown on the cover. */
function coverTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim() || title;
}

export function BookCover({ title, caption }: { title: string; caption?: string | null }) {
  return (
    <span className={styles.cover} style={{ background: coverColor(title) }} aria-hidden>
      <span className={styles.title}>{coverTitle(title)}</span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </span>
  );
}
