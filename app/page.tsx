import { Search } from "lucide-react";
import styles from "./page.module.css";

// Temporary foundation check page (design-system/MASTER.md tokens) — replaced by the real home page in Phase 2.
const covers = [
  { title: "الكافي", author: "الشيخ الكليني", death: "٣٢٩", vols: "٨ مجلدات", color: "#5b2a14" },
  { title: "الإرشاد", author: "الشيخ المفيد", death: "٤١٣", vols: "مجلدان", color: "#1f3b33" },
  { title: "الصحيفة السجادية", author: "الإمام زين العابدين (ع)", death: "٩٤", vols: "", color: "#3b2f4f" },
];

const categories = [
  ["القرآن الكريم وعلومه", "٣٨"],
  ["مصادر العقائد عند الشيعة", "١١٢"],
  ["مصادر الحديث الشيعية - القسم العام", "٩٦"],
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>تراث الثقلين بين يديك</h1>
          <p className={styles.lead}>
            أكثر من ثمانية عشر ألف كتاب في الحديث والتفسير والفقه والعقائد، للقراءة والبحث في النص الكامل.
          </p>
          <form className={styles.search} role="search" action="/search">
            <label htmlFor="q" className="visually-hidden">
              ابحث في المكتبة
            </label>
            <Search className={styles.searchIcon} size={20} strokeWidth={1.75} aria-hidden />
            <input id="q" name="q" placeholder="طلب العلم فريضة…" />
            <button type="submit">بحث</button>
          </form>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.head}>
          <h2>مختارات الكتب</h2>
          <a href="#">عرض الكل</a>
        </div>
        <div className={styles.covers}>
          {covers.map((c) => (
            <a key={c.title} href="#" className={styles.book}>
              <span className={styles.cover} style={{ background: c.color }}>
                <span className={styles.coverTitle}>{c.title}</span>
                <span className={styles.coverVols}>{c.vols}</span>
              </span>
              <span className={styles.metaTitle}>{c.title}</span>
              <span className={styles.metaAuthor}>
                {c.author} (ت {c.death}هـ)
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="categories" className={`container ${styles.section}`}>
        <h3 className={styles.listHead}>الكتب الشيعية</h3>
        <ul className={styles.index}>
          {categories.map(([name, count]) => (
            <li key={name}>
              <a href="#">
                <span>{name}</span>
                <span className={styles.count}>{count}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
