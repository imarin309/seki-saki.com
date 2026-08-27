"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTAGRAM_URL } from "@/app/meta";
import { LABEL } from "@/app/design";
import { localeFromPathname, withLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dict = getDictionary(locale);

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-baseline sm:justify-between md:px-10">
        <div className="flex gap-6">
          <Link
            href={withLocale(locale, "/illust")}
            className={`${LABEL} transition-colors hover:text-terracotta`}
          >
            {dict.nav.illust}
          </Link>
          <Link
            href={withLocale(locale, "/works")}
            className={`${LABEL} transition-colors hover:text-terracotta`}
          >
            {dict.nav.works}
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LABEL} transition-colors hover:text-terracotta`}
          >
            {dict.nav.instagram}
          </a>
        </div>
        <p className="text-xs tracking-[0.1em] text-ink-muted">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
