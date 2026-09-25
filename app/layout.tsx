import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { fontVariables } from "./fonts";
import "./globals.css";

const siteName = "مكتبة الثقلين";

export const metadata: Metadata = {
  title: { default: siteName, template: `%s | ${siteName}` },
  description: "مكتبة الثقلين: تصفّح وابحث واقرأ أكثر من ثمانية عشر ألف كتاب.",
  applicationName: siteName,
  openGraph: { siteName, locale: "ar_AR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body>
        <a href="#main" className="skip-link">
          تخطَّ إلى المحتوى
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
