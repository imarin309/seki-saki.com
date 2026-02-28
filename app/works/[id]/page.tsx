"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { works } from "@/data/works";

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const work = works.find((w) => w.id === id);

  if (!work) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl">Work not found</h1>
          <Link
            href="/works"
            className="text-gray-400 transition-colors hover:text-white"
          >
            Back to Works
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = works.findIndex((w) => w.id === id);
  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork =
    currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

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
            onClick={() => router.push("/works")}
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Works
          </button>
        </motion.div>

        {/* Work Content */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden bg-gray-900"
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
            />
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
              <span className="text-gray-500">{work.year}</span>
            </div>
            <h1 className="mb-6 text-4xl md:text-5xl">{work.title}</h1>
            <p className="mb-8 text-xl text-gray-400">{work.description}</p>
            <div className="border-t border-white/10 pt-8">
              <h2 className="mb-4 text-xl">プロジェクト詳細</h2>
              <p className="leading-relaxed text-gray-400">{work.details}</p>
            </div>
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
                <Link href={`/works/${prevWork.id}`} className="group block">
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
                <Link href={`/works/${nextWork.id}`} className="group block">
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
