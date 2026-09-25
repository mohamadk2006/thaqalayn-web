import Link from "next/link";
import styles from "./site-footer.module.css";

const columns = [
  {
    title: "تصفّح",
    links: [
      { href: "/#categories", label: "الأقسام" },
      { href: "/books", label: "كل الكتب" },
    ],
  },
  {
    title: "البحث",
    links: [
      { href: "/search", label: "البحث في النصوص" },
      { href: "/toc-search", label: "البحث في الفهارس" },
    ],
  },
  {
    title: "المكتبة",
    links: [
      { href: "/my", label: "مكتبتي" },
      { href: "/about", label: "حول المكتبة" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Link href="/" className={styles.brand}>
            مكتبة الثقلين
          </Link>
          <p>أكثر من ثمانية عشر ألف كتاب في الحديث والتفسير والفقه والعقائد، للقراءة والبحث في النص الكامل.</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={styles.col}>
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={`container ${styles.bottom}`}>© ٢٠٢٦ مكتبة الثقلين</div>
    </footer>
  );
}
