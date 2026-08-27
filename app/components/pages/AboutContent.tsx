"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PageHeader } from "@/app/components/PageHeader";
import { PROSE, fadeIn } from "@/app/design";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function AboutContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
      <PageHeader kicker={dict.about.kicker} title={dict.about.title} />

      {/* 左右非対称。写真を左の狭い段に、文章を右の広い段に置く */}
      <div className="flex flex-col gap-14 md:flex-row md:gap-20 lg:gap-28">
        <motion.div
          {...fadeIn(0.3)}
          className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-paper-deep md:w-[34%] lg:w-[30%]"
        >
          <Image
            src="https://assets.seki-saki.com/meta/star.webp"
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 768px) 34vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="max-w-xl md:pt-6">
          <motion.h2
            {...fadeIn(0.35)}
            className="mb-12 font-display text-2xl leading-relaxed text-ink md:text-3xl"
          >
            {dict.about.heading}
          </motion.h2>
          {dict.about.bio.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              {...fadeIn(0.4 + index * 0.08)}
              className={PROSE}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
