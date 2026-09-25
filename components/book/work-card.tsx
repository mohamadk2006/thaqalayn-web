import Link from "next/link";
import type { Work } from "@/lib/api/types";
import { authorLine, volumesLabel } from "@/lib/format";
import { BookCover } from "./book-cover";
import styles from "./work-card.module.css";

/** Cover + title + author, linking to the work page (one card per work, multi-volume included). */
export function WorkCard({ work }: { work: Work }) {
  const volumes = volumesLabel(work.volumeCount);
  return (
    <Link href={`/work/${work.workId}`} className={styles.card}>
      <BookCover title={work.title} caption={volumes} />
      <span className={styles.title}>{work.title}</span>
      <span className={styles.author}>{authorLine(work.author, work.authorDeath)}</span>
    </Link>
  );
}

/** `strip`: on phones the grid becomes one horizontally scrolling row (used on the home page). */
export function WorkGrid({ works, strip = false }: { works: Work[]; strip?: boolean }) {
  return (
    <ul className={`${styles.grid} ${strip ? styles.strip : ""}`}>
      {works.map((w) => (
        <li key={w.workId}>
          <WorkCard work={w} />
        </li>
      ))}
    </ul>
  );
}
