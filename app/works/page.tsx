"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { sortedWorks } from "@/data/works";

function excerpt(text: string) {
  const firstParagraph = text.split("\n").find((line) => line.trim());
  if (!firstParagraph) return "";
  return firstParagraph.length > 90
    ? `${firstParagraph.slice(0, 90)}...`
    : firstParagraph;
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
                <div className="shrink-0 md:w-[168px] md:pr-8 md:text-right">
                  <span className="text-sm tabular-nums text-gray-500">
                    {work.date.replace("/", " / ")}
                  </span>
                </div>

                <div className="absolute left-[-4px] top-1 size-2 rounded-full bg-white md:left-[176px]" />

                <Link
                  href={`/works/${work.id}`}
                  className="group flex flex-1 flex-col overflow-hidden rounded border border-white/10 bg-[#111111] transition-colors hover:border-white/30 sm:flex-row md:ml-8"
                >
                  {work.images && work.images.length > 0 && (
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-900 sm:h-auto sm:w-40">
                      <Image
                        src={work.images[0]}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="mb-3 text-xl transition-colors group-hover:text-gray-300">
                      {work.title}
                    </h2>
                    <p className="mb-5 whitespace-pre-line leading-relaxed text-gray-400">
                      {excerpt(work.description)}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm text-gray-400 transition-colors group-hover:text-white">
                      View work
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
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
