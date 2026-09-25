import Link from "next/link";
import { getLibraries } from "@/lib/api/server";
import { HeaderSearch } from "./header-search";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { primaryNav } from "./nav";
import styles from "./site-header.module.css";

async function husseiniyaId(): Promise<string | null> {
  try {
    const libraries = await getLibraries();
    return libraries.find((l) => !l.parentId)?.id ?? null;
  } catch {
    // The header must render even when the API is down; the link is just omitted.
    return null;
  }
}

export async function SiteHeader() {
  const items = primaryNav(await husseiniyaId());

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          مكتبة الثقلين
        </Link>
        <nav aria-label="التنقل الرئيسي" className={styles.nav}>
          <NavLinks items={items} />
        </nav>
        <HeaderSearch className={styles.search} />
        <MobileMenu items={items} />
      </div>
    </header>
  );
}
