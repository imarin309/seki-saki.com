import type { Metadata } from "next";
import { illusts } from "@/data/illusts";
import { SITE_TITLE, SITE_URL } from "@/app/meta";
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

  const title = `${work.title} | ${SITE_TITLE}`;
  const description = work.description || work.title;
  const url = `${SITE_URL}/illust/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_TITLE,
      images: [
        {
          url: work.image,
          alt: work.title,
        },
      ],
      locale: "ja_JP",
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
  return <WorkDetailClient slug={slug} />;
}
