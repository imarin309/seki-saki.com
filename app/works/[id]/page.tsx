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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkDetailClient id={id} />;
}
