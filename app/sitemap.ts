import type { MetadataRoute } from "next";
import { sortedIllusts } from "@/data/illusts";
import { sortedWorks } from "@/data/works";
import { SITE_URL } from "@/app/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/illust` },
    { url: `${SITE_URL}/works` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
  ];

  const illustRoutes: MetadataRoute.Sitemap = sortedIllusts.map((illust) => ({
    url: `${SITE_URL}/illust/${illust.slug}`,
  }));

  const workRoutes: MetadataRoute.Sitemap = sortedWorks.map((work) => ({
    url: `${SITE_URL}/works/${work.slug}`,
  }));

  return [...staticRoutes, ...illustRoutes, ...workRoutes];
}
