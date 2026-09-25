"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "@/components/site/status-page.module.css";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap} role="alert">
      <h1 className={styles.title}>تعذّر تحميل الصفحة</h1>
      <p className={styles.text}>حدث خطأ أثناء الاتصال بالمكتبة. تحقّق من الاتصال ثم أعد المحاولة.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => retry()} className={styles.primary}>
          إعادة المحاولة
        </button>
        <Link href="/" className={styles.secondary}>
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
