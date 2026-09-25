import localFont from "next/font/local";

// UI fonts (BRIEF §7.2) — preloaded, used on every page.
export const notoKufi = localFont({
  src: [
    { path: "./fonts/NotoKufiArabic-Regular.ttf", weight: "400" },
    { path: "./fonts/NotoKufiArabic-Medium.ttf", weight: "500" },
    { path: "./fonts/NotoKufiArabic-Bold.ttf", weight: "700" },
  ],
  variable: "--font-kufi",
  display: "swap",
});

export const amiri = localFont({
  src: [
    { path: "./fonts/Amiri-Regular.ttf", weight: "400" },
    { path: "./fonts/Amiri-Bold.ttf", weight: "700" },
  ],
  variable: "--font-amiri",
  display: "swap",
});

// Reader fonts (BRIEF §7.2, plan §6) — not preloaded; the browser fetches
// a file only when the reader actually uses that font.
export const notoNaskh = localFont({
  src: "./fonts/NotoNaskhArabic-VariableFont_wght.ttf",
  weight: "400 700",
  variable: "--font-naskh",
  display: "swap",
  preload: false,
});

export const scheherazade = localFont({
  src: "./fonts/ScheherazadeNew-Regular.ttf",
  variable: "--font-scheherazade",
  display: "swap",
  preload: false,
});

export const notoSans = localFont({
  src: [
    { path: "./fonts/NotoSansArabic-Regular.ttf", weight: "400" },
    { path: "./fonts/NotoSansArabic-Bold.ttf", weight: "700" },
  ],
  variable: "--font-sans-ar",
  display: "swap",
  preload: false,
});

export const fontVariables = [notoKufi, amiri, notoNaskh, scheherazade, notoSans]
  .map((f) => f.variable)
  .join(" ");
