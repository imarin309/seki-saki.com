"use client";

import Image from "next/image";
import Link from "next/link";
import type { Illust } from "@/data/illusts";
import { getIllustTitle } from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { LABEL } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";

interface Props {
  work: Illust;
  locale: Locale;
  /** 図版番号。指定するとキャプションの先頭に置く */
  plateNumber?: number;
  sizes?: string;
  priority?: boolean;
}

/**
 * 一覧に並べる図版。カードには入れず、画像をそのまま面に置き、
 * キャプションだけを下に小さく添える。
 */
export default function IllustCard({
  work,
  locale,
  plateNumber,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw",
  priority = false,
}: Props) {
  const title = getIllustTitle(work, locale);

  return (
    <Link
      href={withLocale(locale, `/illust/${work.slug}`)}
      className="group block"
    >
      {/* 画像は原寸の縦横比のまま置き、トリミングしない */}
      <div className="relative overflow-hidden bg-paper-deep">
        <Image
          src={work.image}
          alt={title}
          width={0}
          height={0}
          sizes={sizes}
          priority={priority}
          className={`h-auto w-full duration-700 ${
            work.image2
              ? "transition-opacity group-hover:opacity-0"
              : "transition-opacity group-hover:opacity-90"
          }`}
        />
        {work.image2 && (
          <Image
            src={work.image2}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>

      <p className={`${LABEL} mt-5 flex items-baseline gap-3`}>
        {plateNumber !== undefined && (
          <span className="shrink-0 tabular-nums">
            {String(plateNumber).padStart(2, "0")}
          </span>
        )}
        <span>
          {getIllustCategoryLabel(locale, work.category)}
          <span className="mx-2 text-line-strong">/</span>
          {work.date.replace(/\//g, ".")}
        </span>
      </p>
    </Link>
  );
}
