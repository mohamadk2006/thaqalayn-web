// Display formatting shared by server and client components.

const numberFormat = new Intl.NumberFormat("ar-EG");

/** 18801 → "١٨٬٨٠١" (Arabic-Indic digits, design-system §3). */
export function formatNumber(n: number): string {
  return numberFormat.format(n);
}

/** Replaces Western digits in free text with Arabic-Indic ones: "نحو سنة 329" → "نحو سنة ٣٢٩". */
export function arabicDigits(text: string): string {
  return text.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

/**
 * Author death label from the free-text `authorDeath` field:
 * "329" → "ت ٣٢٩هـ", "نحو سنة 329" → "ت نحو سنة ٣٢٩هـ", "معاصر" → "معاصر",
 * anything without a year ("حي القيوم", empty) → null.
 */
export function deathLabel(raw: string | null | undefined): string | null {
  const text = raw?.trim();
  if (!text) return null;
  if (text.includes("معاصر")) return "معاصر";
  if (!/\d/.test(text)) return null;
  const withEra = /هـ|ه$|م$|ق\s*م|ق\.م/.test(text) ? text : `${text}هـ`;
  return `ت ${arabicDigits(withEra)}`;
}

/** "الشيخ الكليني (ت ٣٢٩هـ)" — author name with the death label when there is one. */
export function authorLine(author: string, death: string | null | undefined): string {
  const label = deathLabel(death);
  return label ? `${author} (${label})` : author;
}

/** Volume count phrase with Arabic number agreement: 1 → null, 2 → "مجلدان", 3–10 → "٣ مجلدات", 11+ → "١١ مجلدًا". */
export function volumesLabel(count: number): string | null {
  if (count <= 1) return null;
  if (count === 2) return "مجلدان";
  if (count <= 10) return `${formatNumber(count)} مجلدات`;
  return `${formatNumber(count)} مجلدًا`;
}

/** Book count phrase: 1 → "كتاب واحد", 2 → "كتابان", 3–10 → "٣ كتب", 11+ → "١١ كتابًا". */
export function booksLabel(count: number): string {
  if (count === 1) return "كتاب واحد";
  if (count === 2) return "كتابان";
  if (count >= 3 && count <= 10) return `${formatNumber(count)} كتب`;
  return `${formatNumber(count)} كتابًا`;
}
