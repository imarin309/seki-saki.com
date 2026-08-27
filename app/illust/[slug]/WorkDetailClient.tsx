"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  sortedIllusts,
  getIllustTitle,
  getIllustDescription,
} from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { BookLink } from "@/app/components/BookLink";
import { PageTurnNav } from "@/app/components/PageTurnNav";
import { LABEL, PROSE, fadeIn } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function WorkDetailClient({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const [showAlt, setShowAlt] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentIndex = sortedIllusts.findIndex((w) => w.slug === slug);
  const work = currentIndex >= 0 ? sortedIllusts[currentIndex] : null;

  if (!work) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-8 px-6">
        <h1 className="font-display text-2xl md:text-3xl">
          {dict.illustDetail.workNotFound}
        </h1>
        <BookLink href={withLocale(locale, "/illust")}>
          {dict.illustDetail.backToIllusts}
        </BookLink>
      </div>
    );
  }

  const prevWork = currentIndex > 0 ? sortedIllusts[currentIndex - 1] : null;
  const nextWork =
    currentIndex < sortedIllusts.length - 1
      ? sortedIllusts[currentIndex + 1]
      : null;

  const title = getIllustTitle(work, locale);
  const description = getIllustDescription(work, locale);
  const plateNumber = String(currentIndex + 1).padStart(2, "0");

  return (
    <article className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
      <motion.div {...fadeIn()}>
        <Link
          href={withLocale(locale, "/illust")}
          className={`${LABEL} inline-flex items-center gap-3 transition-colors hover:text-terracotta`}
        >
          <span aria-hidden>←</span>
          {dict.illustDetail.backToIllusts}
        </Link>
      </motion.div>

      {/* 図版番号と通し番号。本のノンブルにあたる情報 */}
      <motion.div
        {...fadeIn(0.05)}
        className="mt-10 flex items-baseline justify-between border-b border-line pb-4"
      >
        <span className={`${LABEL} tabular-nums`}>
          {dict.illustDetail.plate} {plateNumber}
        </span>
        <span className={`${LABEL} tabular-nums`}>
          {currentIndex + 1} / {sortedIllusts.length}
        </span>
      </motion.div>

      <figure className="mt-14 md:mt-20">
        {/*
          版面に合わせて 1 枚を置く。トリミングせず全体を見せる。
          モバイルは画面が狭いので幅いっぱい（原寸の縦横比）に、
          md 以上は版面の高さを揃えたいので固定高さの中央へ収める。
        */}
        <motion.div
          {...fadeIn(0.1)}
          className="group relative mx-auto w-full max-w-5xl [touch-action:pan-y] md:flex md:h-[72svh] md:items-center md:justify-center"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (!work.image2) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
              setShowAlt((v) => !v);
            }
          }}
        >
          <Image
            src={work.image}
            alt={title}
            width={0}
            height={0}
            sizes="(min-width: 1024px) 64rem, 100vw"
            priority
            className={`h-auto w-full md:h-full md:w-auto md:max-w-full md:object-contain ${
              work.image2
                ? `transition-opacity duration-700 ${showAlt ? "opacity-0" : "group-hover:opacity-0"}`
                : ""
            }`}
          />
          {work.image2 && (
            <Image
              src={work.image2}
              alt={title}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className={`object-contain transition-opacity duration-700 ${
                showAlt ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          )}
        </motion.div>

        {work.image2 && (
          <div className="mx-auto mt-6 flex max-w-5xl justify-center gap-2">
            <span
              className={`block h-px w-6 transition-colors duration-500 ${
                showAlt ? "bg-line-strong" : "bg-terracotta"
              }`}
            />
            <span
              className={`block h-px w-6 transition-colors duration-500 ${
                showAlt ? "bg-terracotta" : "bg-line-strong"
              }`}
            />
          </div>
        )}

        <figcaption className="mx-auto mt-16 max-w-5xl md:mt-20">
          <motion.h1
            {...fadeIn(0.2)}
            className="font-display text-3xl leading-tight tracking-[0.04em] text-ink md:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.dl
            {...fadeIn(0.3)}
            className="mt-10 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:gap-16"
          >
            <div>
              <dt className={LABEL}>{dict.illustDetail.year}</dt>
              <dd className="mt-2 font-display text-sm tabular-nums text-ink">
                {work.date.replace(/\//g, ".")}
              </dd>
            </div>
            <div>
              <dt className={LABEL}>{dict.illustDetail.technique}</dt>
              <dd className="mt-2 font-display text-sm text-ink">
                {getIllustCategoryLabel(locale, work.category)}
              </dd>
            </div>
          </motion.dl>

          {description && (
            <motion.p {...fadeIn(0.4)} className={`${PROSE} mt-12 max-w-2xl`}>
              {description}
            </motion.p>
          )}
        </figcaption>
      </figure>

      {/* Previous Page / Next Page */}
      <motion.div {...fadeIn(0.5)} className="mt-32 md:mt-40">
        <PageTurnNav
          previous={
            prevWork && {
              href: withLocale(locale, `/illust/${prevWork.slug}`),
              title: getIllustTitle(prevWork, locale),
              meta: getIllustCategoryLabel(locale, prevWork.category),
              image: prevWork.image,
            }
          }
          next={
            nextWork && {
              href: withLocale(locale, `/illust/${nextWork.slug}`),
              title: getIllustTitle(nextWork, locale),
              meta: getIllustCategoryLabel(locale, nextWork.category),
              image: nextWork.image,
            }
          }
          labels={{
            previous: dict.illustDetail.previous,
            next: dict.illustDetail.next,
            noPrevious: dict.illustDetail.noPreviousWork,
            noNext: dict.illustDetail.noNextWork,
          }}
        />
      </motion.div>
    </article>
  );
}
