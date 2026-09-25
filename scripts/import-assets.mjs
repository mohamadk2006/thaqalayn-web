// Copies fonts and the app icon from the Android handoff folder into the web app.
// (The web has its own design — design-system/MASTER.md — so the app artwork is not used.)
// Run: node scripts/import-assets.mjs
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const handoff = path.resolve(root, "../../Android app/ThaqalaynAndroidHandoff");

// GESS Two Light is not used on the web (titles use Amiri, design-system §3).
// Mosawi-Bold is left out of this public repo until its licence is confirmed.
const fonts = [
  "NotoKufiArabic-Regular.ttf",
  "NotoKufiArabic-Medium.ttf",
  "NotoKufiArabic-Bold.ttf",
  "Amiri-Regular.ttf",
  "Amiri-Bold.ttf",
  "NotoNaskhArabic-VariableFont_wght.ttf",
  "ScheherazadeNew-Regular.ttf",
  "NotoSansArabic-Regular.ttf",
  "NotoSansArabic-Bold.ttf",
];

await mkdir(path.join(root, "app/fonts"), { recursive: true });
for (const f of fonts) {
  await copyFile(path.join(handoff, "fonts", f), path.join(root, "app/fonts", f));
}

// App icons (favicon + Apple touch icon), picked up by Next's file conventions.
const icon = path.join(handoff, "images/app-icon-1024.png");
await sharp(icon).resize(512).png().toFile(path.join(root, "app/icon.png"));
await sharp(icon).resize(180).png().toFile(path.join(root, "app/apple-icon.png"));
console.log("done");
