import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/site/status-page.module.css";

export const metadata: Metadata = { title: "الصفحة غير موجودة" };

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.code} aria-hidden>
        ٤٠٤
      </div>
      <h1 className={styles.title}>الصفحة غير موجودة</h1>
      <p className={styles.text}>ربما تغيّر الرابط أو حُذف الكتاب. جرّب البحث أو تصفّح الأقسام.</p>
      <div className={styles.actions}>
        <Link href="/search" className={styles.primary}>
          البحث في المكتبة
        </Link>
        <Link href="/" className={styles.secondary}>
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
