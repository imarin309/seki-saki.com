"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import {
  sortedIllusts,
  getIllustTitle,
  getIllustDescription,
} from "@/data/illusts";
import { getIllustCategoryLabel } from "@/app/config";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function WorkDetailClient({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const router = useRouter();
  const dict = getDictionary(locale);
  const [showAlt, setShowAlt] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const work = sortedIllusts.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">
            {dict.illustDetail.workNotFound}
          </h1>
          <Link
            href={withLocale(locale, "/illust")}
            className="text-ink-soft transition-colors hover:text-terracotta"
          >
            {dict.illustDetail.backToIllusts}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = sortedIllusts.findIndex((w) => w.slug === slug);
  const prevWork = currentIndex > 0 ? sortedIllusts[currentIndex - 1] : null;
  const nextWork =
    currentIndex < sortedIllusts.length - 1
      ? sortedIllusts[currentIndex + 1]
      : null;

  const title = getIllustTitle(work, locale);
  const description = getIllustDescription(work, locale);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push(withLocale(locale, "/illust"))}
            className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-terracotta"
          >
            <ArrowLeft size={20} />
            {dict.illustDetail.backToIllusts}
          </button>
        </motion.div>

        {/* Work Content */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-paper-deep shadow-soft [touch-action:pan-y]"
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
              sizes="100vw"
              className={clsx(
                "h-auto w-full",
                work.image2 && [
                  "transition-opacity duration-500",
                  showAlt ? "opacity-0" : "group-hover:opacity-0",
                ]
              )}
            />
            {work.image2 && (
              <>
                <Image
                  src={work.image2}
                  alt={title}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    showAlt
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
                  <span
                    className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${showAlt ? "bg-paper-card/50" : "bg-paper-card"}`}
                  />
                  <span
                    className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${showAlt ? "bg-paper-card" : "bg-paper-card/50"}`}
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4">
              <span className="text-ink-muted">
                {getIllustCategoryLabel(locale, work.category)}
              </span>
              <span className="mx-2 text-ink-muted">/</span>
              <span className="text-ink-muted">{work.date}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mb-8 whitespace-pre-line text-xl leading-relaxed text-ink-soft">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-line pt-12"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Previous Work */}
            <div>
              {prevWork ? (
                <Link
                  href={withLocale(locale, `/illust/${prevWork.slug}`)}
                  className="group block"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-terracotta" />
                    <span className="text-ink-muted">
                      {dict.illustDetail.previous}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line bg-paper-deep">
                      <Image
                        src={prevWork.image}
                        alt={getIllustTitle(prevWork, locale)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-medium text-ink transition-colors group-hover:text-terracotta">
                        {getIllustTitle(prevWork, locale)}
                      </h3>
                      <p className="text-ink-muted">
                        {getIllustCategoryLabel(locale, prevWork.category)}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-terracotta" />
                    <span className="text-ink-muted">
                      {dict.illustDetail.previous}
                    </span>
                  </div>
                  <p className="text-ink-muted">
                    {dict.illustDetail.noPreviousWork}
                  </p>
                </div>
              )}
            </div>

            {/* Next Work */}
            <div className="md:text-right">
              {nextWork ? (
                <Link
                  href={withLocale(locale, `/illust/${nextWork.slug}`)}
                  className="group block"
                >
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-ink-muted">
                      {dict.illustDetail.next}
                    </span>
                    <ArrowRight size={20} className="text-terracotta" />
                  </div>
                  <div className="flex justify-end gap-4">
                    <div className="text-right">
                      <h3 className="mb-1 text-xl font-medium text-ink transition-colors group-hover:text-terracotta">
                        {getIllustTitle(nextWork, locale)}
                      </h3>
                      <p className="text-ink-muted">
                        {getIllustCategoryLabel(locale, nextWork.category)}
                      </p>
                    </div>
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line bg-paper-deep">
                      <Image
                        src={nextWork.image}
                        alt={getIllustTitle(nextWork, locale)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-ink-muted">
                      {dict.illustDetail.next}
                    </span>
                    <ArrowRight size={20} className="text-terracotta" />
                  </div>
                  <p className="text-ink-muted">
                    {dict.illustDetail.noNextWork}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
