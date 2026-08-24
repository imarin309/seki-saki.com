"use client";

import Image from "next/image";
import Link from "next/link";
import type { Illust } from "@/data/illusts";
import { getIllustTitle, getIllustDescription } from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { withLocale, type Locale } from "@/i18n/config";

interface Props {
  work: Illust;
  locale: Locale;
}

export default function IllustCard({ work, locale }: Props) {
  const title = getIllustTitle(work, locale);
  const description = getIllustDescription(work, locale);

  return (
    <Link
      href={withLocale(locale, `/illust/${work.slug}`)}
      className="group block"
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-paper-deep shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
        <Image
          src={work.image}
          alt={title}
          fill
          className={`object-cover duration-500 ${
            work.image2
              ? "transition-opacity group-hover:opacity-0"
              : "transition-transform group-hover:scale-105"
          }`}
        />
        {work.image2 && (
          <Image
            src={work.image2}
            alt={title}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="whitespace-pre-line text-sm text-paper-card">
            {description}
          </p>
        </div>
      </div>
      <h3 className="mb-1 text-xl font-medium text-ink transition-colors group-hover:text-terracotta">
        {title}
      </h3>
      <p className="flex items-center gap-2 text-sm text-ink-muted">
        <span className="rounded-full bg-paper-deep px-2.5 py-0.5 text-xs text-ink-soft">
          {getIllustCategoryLabel(locale, work.category)}
        </span>
        {work.date}
      </p>
    </Link>
  );
}
