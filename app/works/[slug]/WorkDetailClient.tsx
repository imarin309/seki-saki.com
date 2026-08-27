"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { sortedWorks, getWorkTitle, getWorkDescription } from "@/data/works";
import { BookLink } from "@/app/components/BookLink";
import { PageTurnNav } from "@/app/components/PageTurnNav";
import { LABEL, PROSE, fadeIn } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);

  return parts.map((part, index) =>
    // split() with a capturing group places matches at odd indices
    index % 2 === 1 ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terracotta underline underline-offset-4 transition-colors hover:text-terracotta-dark"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function ImageCarousel({
  images,
  title,
  dict,
}: {
  images: string[];
  title: string;
  dict: ReturnType<typeof getDictionary>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (nextIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: nextIndex * container.clientWidth,
      behavior: "smooth",
    });
    setIndex(nextIndex);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    setIndex(Math.round(container.scrollLeft / container.clientWidth));
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image}
              className="relative h-[52svh] w-full shrink-0 snap-center md:h-[68svh]"
            >
              <Image
                src={image}
                alt={`${title} ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(index - 1, 0))}
              disabled={index === 0}
              aria-label={dict.worksDetail.prevImageAria}
              className="absolute left-0 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center border border-line bg-paper/80 text-ink backdrop-blur-sm transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-25 sm:flex"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToIndex(Math.min(index + 1, images.length - 1))
              }
              disabled={index === images.length - 1}
              aria-label={dict.worksDetail.nextImageAria}
              className="absolute right-0 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center border border-line bg-paper/80 text-ink backdrop-blur-sm transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-25 sm:flex"
            >
              <span aria-hidden>→</span>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {images.map((image, i) => (
            <span
              key={image}
              className={`block h-px w-6 transition-colors duration-500 ${
                i === index ? "bg-terracotta" : "bg-line-strong"
              }`}
            />
          ))}
        </div>
      )}
    </div>
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
  const currentIndex = sortedWorks.findIndex((w) => w.slug === slug);
  const work = currentIndex >= 0 ? sortedWorks[currentIndex] : null;

  if (!work) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-8 px-6">
        <h1 className="font-display text-2xl md:text-3xl">
          {dict.worksDetail.workNotFound}
        </h1>
        <BookLink href={withLocale(locale, "/works")}>
          {dict.worksDetail.backToWorks}
        </BookLink>
      </div>
    );
  }

  const prevWork = currentIndex > 0 ? sortedWorks[currentIndex - 1] : null;
  const nextWork =
    currentIndex < sortedWorks.length - 1
      ? sortedWorks[currentIndex + 1]
      : null;

  const title = getWorkTitle(work, locale);
  const description = getWorkDescription(work, locale);
  const entryNumber = String(sortedWorks.length - currentIndex).padStart(
    2,
    "0"
  );

  return (
    <article className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
      <motion.div {...fadeIn()}>
        <Link
          href={withLocale(locale, "/works")}
          className={`${LABEL} inline-flex items-center gap-3 transition-colors hover:text-terracotta`}
        >
          <span aria-hidden>←</span>
          {dict.worksDetail.backToWorks}
        </Link>
      </motion.div>

      <motion.div
        {...fadeIn(0.05)}
        className="mt-10 flex items-baseline justify-between border-b border-line pb-4"
      >
        <span className={`${LABEL} tabular-nums`}>
          {dict.worksDetail.entry} {entryNumber}
        </span>
        <span className={`${LABEL} tabular-nums`}>
          {work.date.replace(/\//g, ".")}
        </span>
      </motion.div>

      <motion.h1
        {...fadeIn(0.1)}
        className="mt-14 max-w-4xl font-display text-2xl leading-relaxed tracking-[0.04em] text-ink md:mt-20 md:text-4xl"
      >
        {title}
      </motion.h1>

      <motion.div {...fadeIn(0.2)} className="mx-auto mt-14 max-w-5xl md:mt-20">
        {work.images && work.images.length > 0 ? (
          <ImageCarousel images={work.images} title={title} dict={dict} />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center border border-line text-sm text-ink-muted">
            {dict.worksDetail.noImage}
          </div>
        )}
      </motion.div>

      <motion.div {...fadeIn(0.3)} className="mx-auto mt-16 max-w-5xl md:mt-20">
        <p className={`${PROSE} max-w-2xl border-t border-line pt-10`}>
          <Linkify text={description} />
        </p>
      </motion.div>

      {/* Previous Page / Next Page */}
      <motion.div {...fadeIn(0.4)} className="mt-32 md:mt-40">
        <PageTurnNav
          previous={
            prevWork && {
              href: withLocale(locale, `/works/${prevWork.slug}`),
              title: getWorkTitle(prevWork, locale),
              meta: prevWork.date.replace(/\//g, "."),
              image: prevWork.images?.[0],
            }
          }
          next={
            nextWork && {
              href: withLocale(locale, `/works/${nextWork.slug}`),
              title: getWorkTitle(nextWork, locale),
              meta: nextWork.date.replace(/\//g, "."),
              image: nextWork.images?.[0],
            }
          }
          labels={{
            previous: dict.worksDetail.previous,
            next: dict.worksDetail.next,
            noPrevious: dict.worksDetail.noPreviousWork,
            noNext: dict.worksDetail.noNextWork,
          }}
        />
      </motion.div>
    </article>
  );
}
