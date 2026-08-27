"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { sortedIllusts } from "@/data/illusts";
import { ILLUST_CATEGORIES, getIllustCategoryLabel } from "@/app/config";
import IllustCard from "@/app/components/IllustCard";
import { PageHeader } from "@/app/components/PageHeader";
import { LABEL, fadeIn } from "@/app/design";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** 「すべて」を表すフィルター値 */
const ALL = "__all__";

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-10">
      <span className={`${LABEL} shrink-0 sm:w-20`}>{label}</span>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`border-b pb-1 text-sm tracking-wide transition-colors ${
              value === option.value
                ? "border-terracotta text-terracotta"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IllustListContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [category, setCategory] = useState(ALL);
  const [year, setYear] = useState(ALL);

  // 図版番号は表示中のフィルターに関わらず一定にしたいので、全作品の並び順から決める
  const plateNumbers = useMemo(
    () => new Map(sortedIllusts.map((work, index) => [work.id, index + 1])),
    []
  );

  const years = useMemo(
    () =>
      Array.from(new Set(sortedIllusts.map((work) => work.date.split("/")[0])))
        .sort()
        .reverse(),
    []
  );

  const filteredIllusts = sortedIllusts.filter(
    (work) =>
      (category === ALL || work.category === category) &&
      (year === ALL || work.date.startsWith(year))
  );

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
      <PageHeader
        kicker={dict.illustList.kicker}
        title={dict.illustList.title}
        description={dict.illustList.subtitle}
        meta={`${filteredIllusts.length}${dict.illustList.countSuffix}`}
      />

      <motion.div
        {...fadeIn(0.3)}
        className="mb-20 flex flex-col gap-6 border-b border-line pb-10 md:mb-28"
      >
        <FilterRow
          label={dict.illustList.categoryFilterLabel}
          value={category}
          onChange={setCategory}
          options={[
            { value: ALL, label: dict.illustList.allCategory },
            ...ILLUST_CATEGORIES.map((name) => ({
              value: name,
              label: getIllustCategoryLabel(locale, name),
            })),
          ]}
        />
        <FilterRow
          label={dict.illustList.yearFilterLabel}
          value={year}
          onChange={setYear}
          options={[
            { value: ALL, label: dict.illustList.allCategory },
            ...years.map((name) => ({ value: name, label: name })),
          ]}
        />
      </motion.div>

      {/* グリッドで揃えず、原寸の縦横比のまま段組みへ流し込む */}
      <div className="gap-x-10 sm:columns-2 lg:columns-3 lg:gap-x-14">
        {filteredIllusts.map((work, index) => (
          <motion.div
            key={work.id}
            {...fadeIn(Math.min(index, 8) * 0.05)}
            className="mb-16 break-inside-avoid md:mb-24"
          >
            <IllustCard
              work={work}
              locale={locale}
              plateNumber={plateNumbers.get(work.id)}
              // 段組みのため DOM 順とファーストビューが一致しない。
              // 常に画面上端にくる先頭の 1 点だけを優先読み込みする
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>

      {filteredIllusts.length === 0 && (
        <p className="py-24 text-sm text-ink-muted">
          {dict.illustList.noResults}
        </p>
      )}
    </div>
  );
}
