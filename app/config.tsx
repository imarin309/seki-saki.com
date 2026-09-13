import type { Locale } from "@/i18n/config";

export const ILLUST_CATEGORIES = ["アナログ", "デジタル", "粘土"];

const ILLUST_CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  ja: {
    アナログ: "アナログ",
    デジタル: "デジタル",
    粘土: "粘土",
  },
  en: {
    アナログ: "Analog",
    デジタル: "Digital",
    粘土: "Clay",
  },
};

export function getIllustCategoryLabel(
  locale: Locale,
  category: string
): string {
  return ILLUST_CATEGORY_LABELS[locale][category] ?? category;
}
