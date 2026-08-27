import type { Metadata, Viewport } from "next";
import { Zen_Kaku_Gothic_New, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/app/components/GoogleAnalytics";
import { SiteChrome } from "@/app/components/SiteChrome";
import { SyncHtmlLang } from "@/app/components/SyncHtmlLang";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_URL,
  SITE_OG_IMAGE,
} from "@/app/meta";

// 本文・UI 用のゴシック
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sans",
});

// 作品タイトル・大見出し用の明朝（作品集の版面をつくる書体）
const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
};

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: SITE_ICON,
    apple: SITE_ICON,
  },
  alternates: {
    languages: {
      ja: SITE_URL,
      en: `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${zenKakuGothicNew.variable} ${zenOldMincho.variable} min-h-screen bg-paper font-sans text-ink`}
      >
        {/* JS 無効時にフェードイン前（opacity: 0）のまま固定されないようにする */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <GoogleAnalytics />
        <SyncHtmlLang />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
