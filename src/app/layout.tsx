import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The fonts are kept in src/fonts (built by scripts/fonts.py), so a build never has to fetch them.
const serif = localFont({
  src: [
    { path: "../fonts/cormorant-garamond.woff2", weight: "300 500", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic.woff2", weight: "300 500", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: [{ path: "../fonts/jost.woff2", weight: "300 500", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Carries only the Chinese characters the site uses; other characters fall back to the device's own font.
const cjk = localFont({
  src: [{ path: "../fonts/noto-serif-sc.woff2", weight: "400", style: "normal" }],
  variable: "--font-cjk",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Little Wow — A collection of balloon sculptures",
    template: "%s — Little Wow",
  },
  description:
    "A personal collection of balloon sculptures, twisted by hand in Melbourne and shown one at a time.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${cjk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
