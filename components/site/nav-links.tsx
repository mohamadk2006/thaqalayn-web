"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrent, type NavItem } from "./nav";
import styles from "./site-header.module.css";

export function NavLinks({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={styles.links}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={styles.link}
            aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
