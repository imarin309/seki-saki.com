"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sortedWorks } from "@/data/works";

function WorkImageCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="group relative h-48 w-full shrink-0 overflow-hidden sm:h-full sm:w-40">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} ${current + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="前の画像"
            className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="次の画像"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`size-1 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function WorksPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="mb-4 text-4xl md:text-6xl">Works</h1>
        </motion.div>

        <div className="relative">
          {/* タイムライン縦線 */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/10 md:left-[180px]" />

          <div className="flex flex-col gap-12">
            {sortedWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex flex-col gap-4 pl-8 md:flex-row md:pl-0"
              >
                {/* 日付 */}
                <div className="shrink-0 md:w-[168px] md:pr-8 md:text-right">
                  <span className="text-sm tabular-nums text-gray-500">
                    {work.date.replace("/", " / ")}
                  </span>
                </div>

                {/* ドット */}
                <div className="absolute left-[-4px] top-1 size-2 rounded-full bg-white md:left-[176px]" />

                {/* カード */}
                <div className="flex flex-1 flex-col overflow-hidden rounded border border-white/10 bg-[#111111] sm:flex-row md:ml-8">
                  {work.images && work.images.length > 0 && (
                    <WorkImageCarousel
                      images={work.images}
                      title={work.title}
                    />
                  )}
                  {/* テキスト */}
                  <div className="flex-1 p-6">
                    <h2 className="mb-3 text-xl">{work.title}</h2>
                    <p className="mb-4 whitespace-pre-line leading-relaxed text-gray-400">
                      {work.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedWorks.length === 0 && (
            <p className="py-20 text-center text-gray-400">
              実績はまだありません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
