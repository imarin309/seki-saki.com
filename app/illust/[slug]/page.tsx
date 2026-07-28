import type { Metadata } from "next";
import { illusts, getIllustTitle, getIllustDescription } from "@/data/illusts";
import { SITE_URL, getSiteTitle, getOgLocale } from "@/app/meta";
import WorkDetailClient from "./WorkDetailClient";

export function generateStaticParams() {
  return illusts.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = illusts.find((w) => w.slug === slug);
  if (!work) return {};

  const workTitle = getIllustTitle(work, "ja");
  const title = `${workTitle} | ${getSiteTitle("ja")}`;
  const description = getIllustDescription(work, "ja") || workTitle;
  const url = `${SITE_URL}/illust/${slug}`;

  return {
    title,
    description,
    alternates: {
      languages: {
        ja: url,
        en: `${SITE_URL}/en/illust/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: getSiteTitle("ja"),
      images: [
        {
          url: work.image,
          alt: workTitle,
        },
      ],
      locale: getOgLocale("ja"),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [work.image],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <WorkDetailClient slug={slug} locale="ja" />;
}
