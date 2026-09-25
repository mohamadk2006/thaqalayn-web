"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import styles from "./search-hero.module.css";

// Big search box with a scope switch (design-system §5). Each scope submits to its own page.
const scopes = [
  { id: "text", label: "النصوص", action: "/search", placeholder: "ابحث في نصوص الكتب" },
  { id: "titles", label: "العناوين والمؤلفون", action: "/books", placeholder: "ابحث عن كتاب أو مؤلف" },
  { id: "toc", label: "الفهارس", action: "/toc-search", placeholder: "ابحث في فهارس الكتب" },
] as const;

export function SearchHero() {
  const [scopeId, setScopeId] = useState<(typeof scopes)[number]["id"]>("text");
  const scope = scopes.find((s) => s.id === scopeId)!;

  return (
    <form role="search" action={scope.action} className={styles.form}>
      <fieldset className={styles.scopes}>
        <legend className="visually-hidden">نطاق البحث</legend>
        {scopes.map((s) => (
          <label key={s.id} className={styles.scope}>
            <input
              type="radio"
              name="scope-choice"
              value={s.id}
              checked={s.id === scopeId}
              onChange={() => setScopeId(s.id)}
              // Not submitted: the scope picks the form's action instead of adding a query param.
              form="scope-only"
            />
            <span>{s.label}</span>
          </label>
        ))}
      </fieldset>
      <div className={styles.field}>
        <label htmlFor="hero-q" className="visually-hidden">
          {scope.placeholder}
        </label>
        <Search className={styles.icon} size={20} strokeWidth={1.75} aria-hidden />
        <input id="hero-q" name="q" type="search" required placeholder={scope.placeholder} enterKeyHint="search" />
        <button type="submit">بحث</button>
      </div>
    </form>
  );
}
