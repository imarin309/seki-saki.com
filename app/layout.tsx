import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/app/components/SiteChrome";
import { SyncHtmlLang } from "@/app/components/SyncHtmlLang";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_URL,
  SITE_OG_IMAGE,
} from "@/app/meta";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
        className={`${notoSerifJP.className} min-h-screen bg-[#0a0a0a] text-white`}
      >
        <SyncHtmlLang />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
