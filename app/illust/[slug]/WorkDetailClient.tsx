"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  sortedIllusts,
  getIllustTitle,
  getIllustLabel,
  getIllustDescription,
  type Illust,
} from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { BookLink } from "@/app/components/BookLink";
import { PageTurnNav } from "@/app/components/PageTurnNav";
import { EASE, LABEL, PROSE, fadeIn } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface Page {
  /** 動画のページでは poster */
  image: string;
  video?: string;
}

function toPages(work: Illust): Page[] {
  return [work.image, ...(work.images ?? [])].map((page) =>
    typeof page === "string"
      ? { image: page }
      : { image: page.poster, video: page.video }
  );
}

export default function WorkDetailClient({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const [pageIndex, setPageIndex] = useState(0);
  const reduceMotion = useReducedMotion();

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

  const hasTitle = getIllustTitle(work, locale) !== "";
  const title = getIllustLabel(work, locale);
  const description = getIllustDescription(work, locale);
  const plateNumber = String(currentIndex + 1).padStart(2, "0");
  const pages = toPages(work);
  const page = pages[pageIndex];
  const pageAlt = pages.length > 1 ? `${title} ${pageIndex + 1}` : title;

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
          className="mx-auto w-full max-w-5xl md:flex md:h-[72svh] md:items-center md:justify-center"
        >
          <motion.div
            key={page.video ?? page.image}
            initial={pageIndex === 0 ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full md:flex md:h-full md:items-center md:justify-center"
          >
            {page.video ? (
              // 視差効果を減らす設定の端末では、自動で動かさず再生を委ねる
              <video
                src={page.video}
                poster={page.image}
                aria-label={pageAlt}
                autoPlay={!reduceMotion}
                controls={!!reduceMotion}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-auto w-full md:h-full md:w-auto md:max-w-full md:object-contain"
              />
            ) : (
              <Image
                src={page.image}
                alt={pageAlt}
                width={0}
                height={0}
                sizes="(min-width: 1024px) 64rem, 100vw"
                priority
                className="h-auto w-full md:h-full md:w-auto md:max-w-full md:object-contain"
              />
            )}
          </motion.div>
        </motion.div>

        {pages.length > 1 && (
          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
            {pages.map((thumb, i) => (
              <button
                key={thumb.video ?? thumb.image}
                type="button"
                onClick={() => setPageIndex(i)}
                aria-label={
                  thumb.video
                    ? dict.illustDetail.showVideoAria(i + 1)
                    : dict.illustDetail.showImageAria(i + 1)
                }
                aria-current={i === pageIndex}
                className={`relative size-14 border bg-paper-deep transition-colors duration-500 md:size-16 ${
                  i === pageIndex
                    ? "border-terracotta"
                    : "border-transparent hover:border-line-strong"
                }`}
              >
                <Image
                  src={thumb.image}
                  alt=""
                  fill
                  sizes="4rem"
                  className="object-cover"
                />
                {thumb.video && (
                  <span
                    aria-hidden
                    className="absolute bottom-1 right-1 flex size-4 items-center justify-center bg-ink/60 text-[8px] leading-none text-paper"
                  >
                    ▶
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        <figcaption className="mx-auto mt-16 max-w-5xl md:mt-20">
          {/* タイトルのない作品も、読み上げと検索のために見えない見出しを残す */}
          <motion.h1
            {...fadeIn(0.2)}
            className={
              hasTitle
                ? "font-display text-3xl leading-tight tracking-[0.04em] text-ink md:text-5xl"
                : "sr-only"
            }
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
              title: getIllustLabel(prevWork, locale),
              meta: getIllustCategoryLabel(locale, prevWork.category),
              image: prevWork.image,
            }
          }
          next={
            nextWork && {
              href: withLocale(locale, `/illust/${nextWork.slug}`),
              title: getIllustLabel(nextWork, locale),
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
