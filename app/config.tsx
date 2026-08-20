import type { Locale } from "@/i18n/config";

export const ILLUST_CATEGORIES = [
  "厚塗り",
  "ペン画",
  "モノクロ",
  "ドローイング",
];

const ILLUST_CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  ja: {
    厚塗り: "厚塗り",
    ペン画: "ペン画",
    モノクロ: "モノクロ",
    ドローイング: "ドローイング",
  },
  en: {
    厚塗り: "Thick Paint",
    ペン画: "Pen Drawing",
    モノクロ: "Monochrome",
    ドローイング: "Drawing",
  },
};

export function getIllustCategoryLabel(
  locale: Locale,
  category: string
): string {
  return ILLUST_CATEGORY_LABELS[locale][category] ?? category;
}
