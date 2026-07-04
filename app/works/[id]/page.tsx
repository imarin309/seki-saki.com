import type { Metadata } from "next";
import { works } from "@/data/works";
import { SITE_TITLE, SITE_URL } from "@/app/meta";
import WorkDetailClient from "./WorkDetailClient";

export function generateStaticParams() {
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const work = works.find((w) => w.id === id);
  if (!work) return {};

  const title = `${work.title} | ${SITE_TITLE}`;
  const description = work.description || work.title;
  const url = `${SITE_URL}/works/${id}`;
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkDetailClient id={id} />;
}
