"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sortedIllusts } from "@/data/illusts";

export default function WorkDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [showAlt, setShowAlt] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const work = sortedIllusts.find((w) => w.id === id);

  if (!work) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl">Work not found</h1>
          <Link
            href="/illust"
            className="text-gray-400 transition-colors hover:text-white"
          >
            Back to Illusts
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = sortedIllusts.findIndex((w) => w.id === id);
  const prevWork = currentIndex > 0 ? sortedIllusts[currentIndex - 1] : null;
  const nextWork =
    currentIndex < sortedIllusts.length - 1
      ? sortedIllusts[currentIndex + 1]
      : null;

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
            onClick={() => router.push("/illust")}
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Illusts
          </button>
        </motion.div>

        {/* Work Content */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="group relative bg-gray-900 [touch-action:pan-y]"
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
              alt={work.title}
              width={0}
              height={0}
              sizes="100vw"
              className={`h-auto w-full${
                work.image2
                  ? `transition-opacity duration-500 ${showAlt ? "opacity-0" : "group-hover:opacity-0"}`
                  : ""
              }`}
            />
            {work.image2 && (
              <>
                <Image
                  src={work.image2}
                  alt={work.title}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    showAlt
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
                  <span
                    className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${showAlt ? "bg-white/40" : "bg-white"}`}
                  />
                  <span
                    className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${showAlt ? "bg-white" : "bg-white/40"}`}
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
              <span className="text-gray-500">{work.category}</span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-500">{work.date}</span>
            </div>
            <h1 className="mb-6 text-4xl md:text-5xl">{work.title}</h1>
            <p className="mb-8 whitespace-pre-line text-xl text-gray-400">
              {work.description}
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 pt-12"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Previous Work */}
            <div>
              {prevWork ? (
                <Link href={`/illust/${prevWork.id}`} className="group block">
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-gray-500">Previous</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden bg-gray-900">
                      <Image
                        src={prevWork.image}
                        alt={prevWork.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {prevWork.title}
                      </h3>
                      <p className="text-gray-500">{prevWork.category}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-gray-500">Previous</span>
                  </div>
                  <p className="text-gray-500">No previous work</p>
                </div>
              )}
            </div>

            {/* Next Work */}
            <div className="md:text-right">
              {nextWork ? (
                <Link href={`/illust/${nextWork.id}`} className="group block">
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-gray-500">Next</span>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  <div className="flex justify-end gap-4">
                    <div className="text-right">
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {nextWork.title}
                      </h3>
                      <p className="text-gray-500">{nextWork.category}</p>
                    </div>
                    <div className="relative h-24 w-24 overflow-hidden bg-gray-900">
                      <Image
                        src={nextWork.image}
                        alt={nextWork.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="opacity-30">
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-gray-500">Next</span>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">No next work</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
