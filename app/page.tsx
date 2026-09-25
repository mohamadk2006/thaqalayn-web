import Link from "next/link";
import { WorkGrid } from "@/components/book/work-card";
import { CategoryIndex } from "@/components/catalog/category-index";
import { SearchHero } from "@/components/search/search-hero";
import { getCatalogStats, getCategoriesWithCounts, getFeaturedWorks } from "@/lib/api/server";
import { formatNumber } from "@/lib/format";
import styles from "./page.module.css";

const FEATURED_ON_HOME = 12;

export default async function Home() {
  const [featured, categories, stats] = await Promise.all([
    getFeaturedWorks(),
    getCategoriesWithCounts(),
    getCatalogStats(),
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>تراث الثقلين بين يديك</h1>
          <p className={styles.lead}>
            مكتبة رقمية مفتوحة في الحديث والتفسير والفقه والعقائد والتاريخ، للقراءة والبحث في النص الكامل.
          </p>
          <SearchHero />
          <dl className={styles.stats}>
            <div>
              <dt>كتاب</dt>
              <dd>{formatNumber(stats.books)}</dd>
            </div>
            <div>
              <dt>مؤلف</dt>
              <dd>{formatNumber(stats.authors)}</dd>
            </div>
            <div>
              <dt>قسمًا</dt>
              <dd>{formatNumber(categories.length)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="featured">
        <div className={styles.head}>
          <h2 id="featured">مختارات الكتب</h2>
          {featured.length > FEATURED_ON_HOME && (
            <Link href="/featured">عرض الكل ({formatNumber(featured.length)})</Link>
          )}
        </div>
        <WorkGrid works={featured.slice(0, FEATURED_ON_HOME)} strip />
      </section>

      <section id="categories" className={styles.band} aria-labelledby="categories-title">
        <div className="container">
          <div className={styles.head}>
            <h2 id="categories-title">الأقسام</h2>
          </div>
          <CategoryIndex categories={categories} />
        </div>
      </section>
    </>
  );
}
