import type { Metadata } from "next";
import { SITE_URL, SITE_OG_IMAGE } from "@/app/meta";
import StillHereContent from "./StillHereContent";

const title = "still here | 世木口 二人展";
const description = "世木口 二人展「still here」特設ページ。";
const url = `${SITE_URL}/exhibition/still_here`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_OG_IMAGE],
  },
};

export default function StillHerePage() {
  return <StillHereContent />;
}
