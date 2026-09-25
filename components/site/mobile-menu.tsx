"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HeaderSearch } from "./header-search";
import { NavLinks } from "./nav-links";
import type { NavItem } from "./nav";
import styles from "./site-header.module.css";

/** Narrow screens: search icon + menu button that opens a panel under the header. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const panelId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when the route changes (e.g. browser back while open).
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setOpenedAt(pathname);
    setOpen((o) => !o);
  };

  return (
    <div className={styles.mobile}>
      <Link href="/search" className={styles.iconButton} aria-label="البحث">
        <Search size={20} strokeWidth={1.75} aria-hidden />
      </Link>
      <button
        ref={button}
        type="button"
        className={styles.iconButton}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "إغلاق القائمة" : "القائمة"}
        onClick={toggle}
      >
        {open ? <X size={20} strokeWidth={1.75} aria-hidden /> : <Menu size={20} strokeWidth={1.75} aria-hidden />}
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        <div className="container">
          <HeaderSearch id="mobile-search" className={styles.panelSearch} />
          <nav aria-label="التنقل الرئيسي">
            <NavLinks items={items} onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      </div>
    </div>
  );
}
