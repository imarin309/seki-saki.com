"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPathname } from "@/i18n/config";

export function SyncHtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname);
  }, [pathname]);

  return null;
}
