import type { Metadata } from "next";
import { works, getWorkTitle, getWorkDescription } from "@/data/works";
import { SITE_URL, getSiteTitle, getOgLocale } from "@/app/meta";
import WorkDetailClient from "@/app/works/[slug]/WorkDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};

  const workTitle = getWorkTitle(work, "en");
  const title = `${workTitle} | ${getSiteTitle("en")}`;
  const description = getWorkDescription(work, "en") || workTitle;
  const url = `${SITE_URL}/en/works/${slug}`;
  const image = work.images?.[0];

  return {
    title,
    description,
    alternates: {
      languages: {
        ja: `${SITE_URL}/works/${slug}`,
        en: url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: getSiteTitle("en"),
      images: image
        ? [
            {
              url: image,
              alt: workTitle,
            },
          ]
        : undefined,
      locale: getOgLocale("en"),
      type: "article",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function WorksDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <WorkDetailClient slug={slug} locale="en" />;
}
