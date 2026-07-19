import type { MetadataRoute } from "next";
import { sortedIllusts } from "@/data/illusts";
import { sortedWorks } from "@/data/works";
import { SITE_URL } from "@/app/meta";

export const dynamic = "force-static";

/**
 * ja/en 双方の URL を、それぞれ自分自身を含む完全な hreflang alternates 付きで
 * 個別の <url> エントリとして返す（Google 推奨のロケール別サイトマップ形式）。
 */
function withAlternates(jaPath: string): MetadataRoute.Sitemap {
  const enPath = jaPath === "" ? "/en" : `/en${jaPath}`;
  const jaUrl = `${SITE_URL}${jaPath}`;
  const enUrl = `${SITE_URL}${enPath}`;
  const languages = { ja: jaUrl, en: enUrl };

  return [
    { url: jaUrl, alternates: { languages } },
    { url: enUrl, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...withAlternates(""),
    ...withAlternates("/illust"),
    ...withAlternates("/works"),
    ...withAlternates("/about"),
    ...withAlternates("/contact"),
  ];

  const illustRoutes: MetadataRoute.Sitemap = sortedIllusts.flatMap((illust) =>
    withAlternates(`/illust/${illust.slug}`)
  );

  const workRoutes: MetadataRoute.Sitemap = sortedWorks.flatMap((work) =>
    withAlternates(`/works/${work.slug}`)
  );

  return [...staticRoutes, ...illustRoutes, ...workRoutes];
}
