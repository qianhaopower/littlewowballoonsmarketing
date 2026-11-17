import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const cjk = Noto_Serif_SC({
  weight: ["400"],
  variable: "--font-cjk",
  display: "swap",
  preload: false,
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
