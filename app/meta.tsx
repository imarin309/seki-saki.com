import type { Locale } from "@/i18n/config";

export const SITE_TITLE = "世木口 | Sekiguchi";
export const SITE_TITLE_EN = "Sekiguchi | Illustrator";
export const SITE_DESCRIPTION =
  "イラストレーター・デザイナー世木口のポートフォリオサイトです。";
export const SITE_DESCRIPTION_EN =
  "Portfolio site of Sekiguchi, an illustrator and designer.";
export const SITE_URL = "https://seki-saki.com";
export const SITE_OG_IMAGE = "https://assets.seki-saki.com/meta/star.webp";
export const SITE_ICON = "https://assets.seki-saki.com/meta/star.webp";
export const CONTACT_EMAIL = "contact@seki-saki.com";
export const INSTAGRAM_URL = "https://www.instagram.com/_sekisaki/";

export function getSiteTitle(locale: Locale): string {
  return locale === "en" ? SITE_TITLE_EN : SITE_TITLE;
}

export function getSiteDescription(locale: Locale): string {
  return locale === "en" ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION;
}

export function getOgLocale(locale: Locale): string {
  return locale === "en" ? "en_US" : "ja_JP";
}
