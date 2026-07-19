"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sortedWorks, getWorkTitle, getWorkDescription } from "@/data/works";
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
        className="text-white underline underline-offset-2 hover:text-gray-300"
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
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <div
            key={image}
            className="w-full shrink-0 snap-center overflow-hidden bg-gray-900"
          >
            <Image
              src={image}
              alt={`${title} ${i + 1}`}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full"
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
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 disabled:opacity-30 sm:flex"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() =>
              scrollToIndex(Math.min(index + 1, images.length - 1))
            }
            disabled={index === images.length - 1}
            aria-label={dict.worksDetail.nextImageAria}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 disabled:opacity-30 sm:flex"
          >
            <ArrowRight size={20} />
          </button>
        </>
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
  const router = useRouter();
  const dict = getDictionary(locale);
  const currentIndex = sortedWorks.findIndex((w) => w.slug === slug);
  const work = currentIndex >= 0 ? sortedWorks[currentIndex] : null;

  if (!work) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl">{dict.worksDetail.workNotFound}</h1>
          <Link
            href={withLocale(locale, "/works")}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {dict.worksDetail.backToWorks}
          </Link>
        </div>
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

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push(withLocale(locale, "/works"))}
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            {dict.worksDetail.backToWorks}
          </button>
        </motion.div>

        <div className="mb-20 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 tabular-nums text-gray-500">
              {work.date.replace(/\//g, " / ")}
            </p>
            <h1 className="text-4xl md:text-5xl">{title}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto w-full lg:max-w-2xl"
          >
            {work.images && work.images.length > 0 ? (
              <ImageCarousel images={work.images} title={title} dict={dict} />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gray-900 text-gray-500">
                {dict.worksDetail.noImage}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="whitespace-pre-line text-xl leading-relaxed text-gray-400">
              <Linkify text={description} />
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 pt-12"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              {prevWork ? (
                <Link
                  href={withLocale(locale, `/works/${prevWork.slug}`)}
                  className="group block"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-gray-500">
                      {dict.worksDetail.previous}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {prevWork.images?.[0] && (
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-900">
                        <Image
                          src={prevWork.images[0]}
                          alt={getWorkTitle(prevWork, locale)}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {getWorkTitle(prevWork, locale)}
                      </h3>
                      <p className="text-gray-500">{prevWork.date}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-gray-500">
                      {dict.worksDetail.previous}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    {dict.worksDetail.noPreviousWork}
                  </p>
                </div>
              )}
            </div>

            <div className="md:text-right">
              {nextWork ? (
                <Link
                  href={withLocale(locale, `/works/${nextWork.slug}`)}
                  className="group block"
                >
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-gray-500">
                      {dict.worksDetail.next}
                    </span>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  <div className="flex justify-end gap-4">
                    <div className="text-right">
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {getWorkTitle(nextWork, locale)}
                      </h3>
                      <p className="text-gray-500">{nextWork.date}</p>
                    </div>
                    {nextWork.images?.[0] && (
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-900">
                        <Image
                          src={nextWork.images[0]}
                          alt={getWorkTitle(nextWork, locale)}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-gray-500">
                      {dict.worksDetail.next}
                    </span>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">{dict.worksDetail.noNextWork}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
