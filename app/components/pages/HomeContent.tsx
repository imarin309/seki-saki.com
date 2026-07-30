"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { sortedIllusts } from "@/data/illusts";
import IllustCard from "@/app/components/IllustCard";
import { withLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function HomeContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featuredIllusts = sortedIllusts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
        <Image
          src={sortedIllusts[0].image}
          alt={sortedIllusts[0].title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a0a0a]" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl tracking-tight md:text-7xl"
          >
            {dict.home.heroTitle}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href={withLocale(locale, "/illust")}
              className="inline-flex items-center gap-2 bg-white px-8 py-3 text-black transition-colors hover:bg-gray-200"
            >
              {dict.home.viewIllusts}
              <ArrowRight size={20} />
            </Link>

            {locale === "ja" && (
              <Link
                href="/exhibition/still_here"
                className="group inline-flex items-center gap-3 border border-white/20 bg-black/40 py-2 pl-2 pr-4 backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden">
                  <Image
                    src="https://assets.seki-saki.com/2026/umigarasu.webp"
                    alt="still here"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs tracking-widest text-gray-300">
                    展示会開催中
                  </p>
                  <p className="text-sm text-white">still here</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-300 transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Illusts Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl">
              {dict.home.featuredHeading}
            </h2>
            <Link
              href={withLocale(locale, "/illust")}
              className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
            >
              {dict.home.viewAll}
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredIllusts.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <IllustCard work={work} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="bg-[#111111] py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full bg-gray-900">
                <Image
                  src="https://assets.seki-saki.com/meta/star.webp"
                  alt="about"
                  fill
                  className="object-cover"
                />
              </div>
              <Link
                href={withLocale(locale, "/about")}
                className="flex flex-shrink-0 items-center justify-center gap-3 text-3xl text-white transition-colors hover:text-gray-400"
              >
                {dict.home.aboutLink}
                <ArrowRight size={32} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl">
              {dict.home.contactCtaHeading}
            </h2>
            <p className="max-w-md text-gray-400">{dict.home.contactCtaText}</p>
            <Link
              href={withLocale(locale, "/contact")}
              className="inline-flex items-center gap-2 bg-white px-8 py-3 text-black transition-colors hover:bg-gray-200"
            >
              {dict.home.contactCtaButton}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
