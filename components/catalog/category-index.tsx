import Link from "next/link";
import type { Category } from "@/lib/api/types";
import { formatNumber } from "@/lib/format";
import styles from "./category-index.module.css";

type CategoryWithCount = Category & { workCount: number };

const sections = [
  { id: "shia", title: "الكتب الشيعية" },
  { id: "other", title: "الكتب الأخرى" },
] as const;

export function categoryHref(id: string): string {
  return `/category/${encodeURIComponent(id)}`;
}

/** Categories as a scholarly index, one column per section (design-system §5 "Index list"). */
export function CategoryIndex({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <div className={styles.cols}>
      {sections.map((section) => {
        const items = categories.filter((c) => (section.id === "shia") === (c.section === "shia"));
        if (items.length === 0) return null;
        return (
          <div key={section.id}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.list}>
              {items.map((c) => (
                <li key={c.id}>
                  <Link href={categoryHref(c.id)} className={styles.row}>
                    <span>{c.title}</span>
                    <span className={styles.count} aria-label={`${formatNumber(c.workCount)} كتاب`}>
                      {formatNumber(c.workCount)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
