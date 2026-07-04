import type { Metadata } from "next";
import { works } from "@/data/works";
import { SITE_TITLE, SITE_URL } from "@/app/meta";
import WorkDetailClient from "./WorkDetailClient";

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

  const title = `${work.title} | ${SITE_TITLE}`;
  const description = work.description || work.title;
  const url = `${SITE_URL}/works/${work.slug}`;
  const image = work.images?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_TITLE,
      images: image
        ? [
            {
              url: image,
              alt: work.title,
            },
          ]
        : undefined,
      locale: "ja_JP",
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
  return <WorkDetailClient slug={slug} />;
}
