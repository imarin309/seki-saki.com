"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sortedWorks } from "@/data/works";

export default function WorkDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const work = sortedWorks.find((w) => w.slug === slug);

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

  const currentIndex = sortedWorks.findIndex((w) => w.slug === slug);
  const prevWork =
    currentIndex < sortedWorks.length - 1 ? sortedWorks[currentIndex + 1] : null;
  const nextWork = currentIndex > 0 ? sortedWorks[currentIndex - 1] : null;

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
            onClick={() => router.push("/works")}
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Works
          </button>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            {work.images && work.images.length > 0 ? (
              work.images.map((image, index) => (
                <div
                  key={image}
                  className="relative overflow-hidden bg-gray-900"
                >
                  <Image
                    src={image}
                    alt={`${work.title} ${index + 1}`}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full"
                    priority={index === 0}
                  />
                </div>
              ))
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gray-900 text-gray-500">
                No image
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start"
          >
            <p className="mb-4 tabular-nums text-gray-500">
              {work.date.replace("/", " / ")}
            </p>
            <h1 className="mb-6 text-4xl md:text-5xl">{work.title}</h1>
            <p className="whitespace-pre-line text-xl leading-relaxed text-gray-400">
              {work.description}
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
                <Link href={`/works/${prevWork.slug}`} className="group block">
                  <div className="mb-4 flex items-center gap-4">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-gray-500">Previous</span>
                  </div>
                  <div className="flex gap-4">
                    {prevWork.images?.[0] && (
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-900">
                        <Image
                          src={prevWork.images[0]}
                          alt={prevWork.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {prevWork.title}
                      </h3>
                      <p className="text-gray-500">{prevWork.date}</p>
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

            <div className="md:text-right">
              {nextWork ? (
                <Link href={`/works/${nextWork.slug}`} className="group block">
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <span className="text-gray-500">Next</span>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  <div className="flex justify-end gap-4">
                    <div className="text-right">
                      <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                        {nextWork.title}
                      </h3>
                      <p className="text-gray-500">{nextWork.date}</p>
                    </div>
                    {nextWork.images?.[0] && (
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-gray-900">
                        <Image
                          src={nextWork.images[0]}
                          alt={nextWork.title}
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
