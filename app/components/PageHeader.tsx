"use client";

import { motion } from "motion/react";
import { LABEL, fadeIn } from "@/app/design";

/**
 * 下層ページの扉。ページタイトルを大きく、補助情報を極端に小さくして
 * タイポグラフィの強弱そのものを版面のデザインにする。
 */
export function PageHeader({
  kicker,
  title,
  description,
  meta,
}: {
  kicker: string;
  title: string;
  description?: string;
  /** 点数など、タイトルの脇に置く極小の補助情報 */
  meta?: string;
}) {
  return (
    <header className="mb-24 md:mb-32">
      <motion.p {...fadeIn()} className={LABEL}>
        {kicker}
      </motion.p>
      <motion.h1
        {...fadeIn(0.1)}
        className="mt-6 font-display text-5xl tracking-[0.06em] text-ink md:text-7xl"
      >
        {title}
      </motion.h1>
      {(description || meta) && (
        <motion.div
          {...fadeIn(0.2)}
          className="mt-8 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between"
        >
          {description && (
            <p className="max-w-xl text-sm leading-loose text-ink-soft">
              {description}
            </p>
          )}
          {meta && <p className={`${LABEL} shrink-0`}>{meta}</p>}
        </motion.div>
      )}
    </header>
  );
}
