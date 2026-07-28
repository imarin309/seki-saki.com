"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function AboutContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="mb-6 text-4xl md:text-6xl">{dict.about.title}</h1>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
            <Image
              src="https://assets.seki-saki.com/meta/star.webp"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl">{dict.about.heading}</h2>
            {dict.about.bio.map((paragraph, index) => (
              <p
                key={index}
                className={`leading-relaxed text-gray-400 ${
                  index === dict.about.bio.length - 1 ? "" : "mb-4"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
