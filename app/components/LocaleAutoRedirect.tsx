"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  getAlternateLocalePath,
  localeFromPathname,
  LOCALE_STORAGE_KEY,
} from "@/i18n/config";

/**
 * 初回訪問時のみ、ブラウザの言語設定が日本語以外なら英語版へ自動遷移する。
 * 一度判定した結果は localStorage に保存し、以降は言語スイッチャーでの
 * 明示的な切り替えを優先して自動遷移しない。
 */
export function LocaleAutoRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem(LOCALE_STORAGE_KEY)) return;

    const locale = localeFromPathname(pathname);
    const prefersJapanese = navigator.language?.toLowerCase().startsWith("ja");

    if (locale === "ja" && !prefersJapanese) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, "en");
      router.replace(getAlternateLocalePath("ja", pathname));
      return;
    }

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [pathname, router]);

  return null;
}
