"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { sortedWorks } from "@/data/works";

export default function HomePage() {
  const featuredWorks = sortedWorks.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl tracking-tight md:text-7xl"
          >
            Designer & Illustrator
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 bg-white px-8 py-3 text-black transition-colors hover:bg-gray-200"
            >
              View Works
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl">Featured Works</h2>
            <Link
              href="/works"
              className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
            >
              View All
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/works/${work.id}`} className="group block">
                  <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-gray-900">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm text-gray-300">
                        {work.description}
                      </p>
                    </div>
                  </div>
                  <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                    {work.title}
                  </h3>
                  <p className="text-gray-500">
                    {work.category} {work.date}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="bg-[#111111] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl md:text-4xl">
                関口咲 Sekiguchi saki
              </h2>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white transition-colors hover:text-gray-400"
              >
                Learn More
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden bg-gray-900"
            >
              <Image
                src="https://assets.seki-saki.com/meta/seki-saki.webp"
                alt="about"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
