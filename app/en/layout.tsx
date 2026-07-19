import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_OG_IMAGE,
  getSiteTitle,
  getSiteDescription,
  getOgLocale,
} from "@/app/meta";

const title = getSiteTitle("en");
const description = getSiteDescription("en");
const url = `${SITE_URL}/en`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    languages: {
      ja: SITE_URL,
      en: url,
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: getOgLocale("en"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_OG_IMAGE],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
