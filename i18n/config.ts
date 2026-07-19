export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

/** パス名（例: "/en/about"）からロケールを判定する */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

/** ロケール別のパスプレフィックス。デフォルトロケール（ja）はプレフィックスなし */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** ja のパス（例: "/illust/foo"）を指定ロケール向けのパスに変換する */
export function withLocale(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return `${localePrefix(locale)}${normalized}` || "/";
}

/**
 * 現在のパスから、もう一方のロケールにおける同一ページのパスを返す。
 * 例: locale=en, pathname="/en/illust/foo" -> "/illust/foo"
 */
export function getAlternateLocalePath(
  locale: Locale,
  pathname: string
): string {
  const currentPrefix = localePrefix(locale);
  const withoutCurrentPrefix = currentPrefix
    ? pathname.replace(new RegExp(`^${currentPrefix}`), "") || "/"
    : pathname;
  const otherLocale: Locale = locale === "ja" ? "en" : "ja";
  return withLocale(otherLocale, withoutCurrentPrefix);
}
