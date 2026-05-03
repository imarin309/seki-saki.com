"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { sortedIllusts } from "@/data/illusts";
import { WORK_CATEGORIES } from "@/app/config";

export default function IllustPage() {
  const [filter, setFilter] = useState(WORK_CATEGORIES[0]);

  const filteredIllusts = sortedIllusts.filter(
    (work) => work.category === filter
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="mb-4 text-4xl md:text-6xl">Illust</h1>
          <p className="text-xl text-gray-400">
            Selected projects and artworks
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {WORK_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`border px-6 py-2 transition-all ${
                  filter === category
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-gray-400 hover:border-white hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Illusts Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredIllusts.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/illust/${work.id}`} className="group block">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-gray-900">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="whitespace-pre-line text-sm text-gray-300">
                      {work.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl transition-colors group-hover:text-gray-400">
                      {work.title}
                    </h3>
                    <p className="text-gray-500">
                      {work.category} {work.date}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredIllusts.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No Illusts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
