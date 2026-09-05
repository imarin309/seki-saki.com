"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { sortedIllusts, getIllustTitle } from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { Chapter } from "@/app/components/Chapter";
import ExhibitionBanner from "@/app/components/ExhibitionBanner";
import { BookLink } from "@/app/components/BookLink";
import { LABEL, PROSE, fadeIn, fadeInView } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type CoverImagePosition = "left" | "center" | "right";

// 縦長のカバー面に収めるため、見せたい位置に合わせて調整する
const COVER_IMAGE_POSITION: CoverImagePosition = "right";

const COVER_IMAGE_POSITION_CLASS: Record<CoverImagePosition, string> = {
  left: "object-left",
  center: "object-center",
  right: "object-right",
};

// 表紙の作品は固定。新着に追従させると縦横比によって見え方が変わるため、slug で指定する
const COVER_ILLUST_SLUG = "drawing_0817";

/**
 * Selected Works は均等なカード一覧にしない。
 * 作品ごとに幅・寄せ・前後の余白を変えて、ページをめくる速度そのものを変える。
 */
const SELECTED_LAYOUTS = [
  {
    // 1点目：いちばん大きく。md 以上ではさらに右へ寄せる
    figure: "md:ml-auto md:w-[74%]",
    caption: "md:items-end md:text-right",
    spacing: "",
  },
  {
    // 2点目：小さく左端に置き、前に大きく余白をとる
    figure: "w-[72%] md:w-[44%]",
    caption: "",
    spacing: "mt-32 md:mt-56",
  },
  {
    // 3点目：中くらいで右へ寄せる。キャプションも寄せた側に揃える
    figure: "ml-auto w-[88%] md:ml-[16%] md:w-[60%]",
    caption: "items-end text-right",
    spacing: "mt-24 md:mt-48",
  },
];

export default function HomeContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featuredIllusts = sortedIllusts.slice(0, SELECTED_LAYOUTS.length);
  const coverIllust =
    sortedIllusts.find((illust) => illust.slug === COVER_ILLUST_SLUG) ??
    sortedIllusts[0];

  return (
    <div>
      {/* Cover */}
      <section className="flex min-h-[calc(100svh-4rem)] flex-col md:flex-row">
        <div className="relative order-2 flex flex-1 flex-col justify-center px-6 py-20 md:order-1 md:px-10 md:py-0 lg:px-16">
          <motion.p {...fadeIn()} className={LABEL}>
            {dict.home.coverRole}
          </motion.p>
          <motion.h1
            {...fadeIn(0.15)}
            className="mt-6 font-display text-6xl leading-none tracking-[0.08em] text-ink md:text-7xl lg:text-8xl"
          >
            {dict.home.coverName}
          </motion.h1>
          <motion.p
            {...fadeIn(0.3)}
            className="mt-10 max-w-sm font-display text-lg leading-loose text-ink-soft md:text-xl"
          >
            {dict.home.coverCopy}
          </motion.p>
          <motion.div {...fadeIn(0.45)} className="mt-14">
            <BookLink href={withLocale(locale, "/illust")}>
              {dict.home.coverCta}
            </BookLink>
          </motion.div>
          <motion.p
            {...fadeIn(0.9)}
            className={`${LABEL} absolute bottom-10 left-10 hidden md:block lg:left-16`}
          >
            {dict.home.scrollHint}
          </motion.p>
        </div>

        {/* 代表作を画面の端まで届かせる */}
        <motion.div
          {...fadeIn(0, 0)}
          className="relative order-1 h-[56svh] w-full bg-paper-deep md:order-2 md:h-auto md:w-[52%] lg:w-[56%]"
        >
          <Image
            src={coverIllust.image}
            alt={getIllustTitle(coverIllust, locale)}
            fill
            sizes="(min-width: 768px) 56vw, 100vw"
            className={`object-cover ${COVER_IMAGE_POSITION_CLASS[COVER_IMAGE_POSITION]}`}
            priority
          />
        </motion.div>
      </section>

      {/* 01 / Introduction */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
        <motion.div {...fadeInView()}>
          <Chapter number="01" label={dict.home.introLabel} />
        </motion.div>
        <div className="mt-14 md:ml-[28%] md:mt-20">
          {dict.home.introBody.map((line, index) => (
            <motion.p
              key={line}
              {...fadeInView(index * 0.12)}
              className={`${PROSE} max-w-xl`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* 02 / Selected Works */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10 md:pb-48">
        <motion.div {...fadeInView()}>
          <Chapter number="02" label={dict.home.selectedLabel} />
          <p className={`${LABEL} mt-5`}>{dict.home.selectedNote}</p>
        </motion.div>

        <div className="mt-20 md:mt-28">
          {featuredIllusts.map((work, index) => {
            const layout = SELECTED_LAYOUTS[index];
            const title = getIllustTitle(work, locale);

            return (
              <motion.figure
                key={work.id}
                {...fadeInView()}
                className={`${layout.spacing} ${layout.figure}`}
              >
                <Link
                  href={withLocale(locale, `/illust/${work.slug}`)}
                  className="group block"
                >
                  <div className="overflow-hidden bg-paper-deep">
                    <Image
                      src={work.image}
                      alt={title}
                      width={0}
                      height={0}
                      sizes="(min-width: 768px) 74vw, 100vw"
                      className="h-auto w-full transition-opacity duration-700 group-hover:opacity-90"
                    />
                  </div>
                  <figcaption
                    className={`mt-6 flex flex-col ${layout.caption}`}
                  >
                    <p className={LABEL}>
                      {getIllustCategoryLabel(locale, work.category)}
                      <span className="mx-2 text-line-strong">/</span>
                      {work.date.replace(/\//g, ".")}
                    </p>
                  </figcaption>
                </Link>
              </motion.figure>
            );
          })}
        </div>

        <motion.div {...fadeInView()} className="mt-28 md:mt-40">
          <BookLink href={withLocale(locale, "/illust")}>
            {dict.home.viewIndex}
          </BookLink>
        </motion.div>
      </section>

      {/* 03 / About */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
          <motion.div {...fadeInView()}>
            <Chapter number="03" label={dict.home.aboutLabel} />
          </motion.div>
          <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:gap-20">
            <motion.div
              {...fadeInView()}
              className="relative aspect-square w-40 shrink-0 overflow-hidden bg-paper-deep md:w-56"
            >
              <Image
                src="https://assets.seki-saki.com/meta/star.webp"
                alt=""
                aria-hidden
                fill
                sizes="224px"
                className="object-cover"
              />
            </motion.div>
            <motion.div {...fadeInView(0.1)} className="md:pb-2">
              <p className="mb-8 max-w-md font-display text-xl leading-loose text-ink md:text-2xl">
                {dict.home.aboutLead}
              </p>
              <BookLink href={withLocale(locale, "/about")}>
                {dict.home.aboutLink}
              </BookLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 04 / Contact */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
          <motion.div {...fadeInView()}>
            <Chapter number="04" label={dict.home.contactLabel} />
          </motion.div>
          <motion.div {...fadeInView(0.1)} className="mt-14 md:ml-[28%]">
            <p className={`${PROSE} max-w-xl`}>{dict.home.contactLead}</p>
            <div className="mt-10">
              <BookLink href={withLocale(locale, "/contact")}>
                {dict.home.contactLink}
              </BookLink>
            </div>
            <div className="mt-14">
              <ExhibitionBanner locale={locale} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
