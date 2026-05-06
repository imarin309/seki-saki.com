"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { sortedIllusts } from "@/data/illusts";
import { ILLUST_CATEGORIES } from "@/app/config";
import IllustCard from "@/app/components/IllustCard";

export default function IllustPage() {
  const [filter, setFilter] = useState(ILLUST_CATEGORIES[0]);

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
            {ILLUST_CATEGORIES.map((category) => (
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
              <IllustCard work={work} />
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
