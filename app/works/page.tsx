"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { sortedWorks } from "@/data/works";

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
                  {/* 画像：モバイルは上部全幅、sm以上は左側固定幅 */}
                  {work.image && (
                    <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-40">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {/* テキスト */}
                  <div className="flex-1 p-6">
                    <h2 className="mb-3 text-xl">{work.title}</h2>
                    <p className="mb-4 leading-relaxed text-gray-400">
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
