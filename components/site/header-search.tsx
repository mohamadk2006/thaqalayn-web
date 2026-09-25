"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./site-header.module.css";

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Compact search field (GET /search?q=). "/" focuses it from anywhere on the page. */
export function HeaderSearch({ className, id = "site-search" }: { className?: string; id?: string }) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const el = input.current;
      if (!el || el.offsetParent === null) return; // hidden (mobile layout)
      e.preventDefault();
      el.focus();
      el.select();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form role="search" action="/search" className={`${styles.searchForm} ${className ?? ""}`}>
      <label htmlFor={id} className="visually-hidden">
        ابحث في المكتبة
      </label>
      <Search size={16} strokeWidth={1.75} aria-hidden className={styles.searchIcon} />
      <input ref={input} id={id} name="q" type="search" placeholder="ابحث في المكتبة" enterKeyHint="search" />
      <kbd className={styles.kbd} aria-hidden>
        /
      </kbd>
    </form>
  );
}
