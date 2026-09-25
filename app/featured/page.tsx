import type { Metadata } from "next";
import { WorkGrid } from "@/components/book/work-card";
import { getFeaturedWorks } from "@/lib/api/server";
import { booksLabel } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "مختارات الكتب",
  description: "مختارات من أمهات المصادر في مكتبة الثقلين.",
};

export default async function FeaturedPage() {
  const works = await getFeaturedWorks();
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>مختارات الكتب</h1>
        <p>{booksLabel(works.length)}</p>
      </header>
      <WorkGrid works={works} />
    </div>
  );
}
