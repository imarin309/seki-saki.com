import type { MetadataRoute } from "next";
import { sortedIllusts } from "@/data/illusts";
import { sortedWorks } from "@/data/works";
import { SITE_URL } from "@/app/meta";

export const dynamic = "force-static";

function withAlternates(jaPath: string): MetadataRoute.Sitemap[number] {
  const enPath = jaPath === "" ? "/en" : `/en${jaPath}`;
  return {
    url: `${SITE_URL}${jaPath}`,
    alternates: {
      languages: {
        ja: `${SITE_URL}${jaPath}`,
        en: `${SITE_URL}${enPath}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    withAlternates(""),
    withAlternates("/illust"),
    withAlternates("/works"),
    withAlternates("/about"),
    withAlternates("/contact"),
  ];

  const illustRoutes: MetadataRoute.Sitemap = sortedIllusts.map((illust) =>
    withAlternates(`/illust/${illust.slug}`)
  );

  const workRoutes: MetadataRoute.Sitemap = sortedWorks.map((work) =>
    withAlternates(`/works/${work.slug}`)
  );

  return [...staticRoutes, ...illustRoutes, ...workRoutes];
}
