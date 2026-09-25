export type NavItem = { href: string; label: string };

/** Primary navigation. The Husseiniya library id comes from the API (see site-header.tsx). */
export function primaryNav(husseiniyaId: string | null): NavItem[] {
  return [
    { href: "/", label: "الرئيسية" },
    { href: "/#categories", label: "الأقسام" },
    { href: "/books", label: "كل الكتب" },
    ...(husseiniyaId ? [{ href: `/library/${husseiniyaId}`, label: "المكتبة الحسينية" }] : []),
    { href: "/my", label: "مكتبتي" },
  ];
}

/** Whether a nav item is the current page (hash links never are). */
export function isCurrent(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
