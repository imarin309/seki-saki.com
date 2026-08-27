"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { sortedWorks, getWorkTitle } from "@/data/works";
import { PageHeader } from "@/app/components/PageHeader";
import { LABEL, fadeIn } from "@/app/design";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function WorksListContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
      <PageHeader kicker={dict.worksList.kicker} title={dict.worksList.title} />

      {/* 目次のように、罫線 1 本ずつで区切って並べる */}
      <ol className="border-t border-line">
        {sortedWorks.map((work, index) => {
          const title = getWorkTitle(work, locale);
          const number = String(sortedWorks.length - index).padStart(2, "0");

          return (
            <motion.li
              key={work.id}
              {...fadeIn(Math.min(index, 8) * 0.06)}
              className="border-b border-line"
            >
              <Link
                href={withLocale(locale, `/works/${work.slug}`)}
                className="group flex flex-col gap-5 py-10 md:grid md:grid-cols-[3rem_9rem_1fr_9rem] md:items-start md:gap-8 md:py-12"
              >
                <span className={`${LABEL} tabular-nums`}>{number}</span>
                <span className={`${LABEL} tabular-nums`}>
                  {work.date.replace(/\//g, ".")}
                </span>
                <h2 className="max-w-2xl font-display text-lg leading-relaxed text-ink transition-colors group-hover:text-terracotta md:text-2xl">
                  {title}
                </h2>
                {/* サムネイルは原寸の縦横比のまま。トリミングして見切れさせない */}
                {work.images && work.images.length > 0 && (
                  <div className="w-40 overflow-hidden bg-paper-deep md:w-full">
                    <Image
                      src={work.images[0]}
                      alt=""
                      aria-hidden
                      width={0}
                      height={0}
                      sizes="(min-width: 768px) 144px, 160px"
                      // 先頭の 1 件はファーストビューに入るため遅延読み込みしない
                      priority={index === 0}
                      className="h-auto w-full transition-opacity duration-700 group-hover:opacity-90"
                    />
                  </div>
                )}
              </Link>
            </motion.li>
          );
        })}
      </ol>

      {sortedWorks.length === 0 && (
        <p className="py-24 text-sm text-ink-muted">{dict.worksList.empty}</p>
      )}
    </div>
  );
}
