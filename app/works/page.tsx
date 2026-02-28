"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { works } from "@/data/works";

const categories = ["All", "デジタルイラスト", "ペンイラスト", "キャラクターイラスト", "レジンアート", "グラフィックデザイン"];

export default function WorksPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredWorks =
    filter === "All" ? works : works.filter((work) => work.category === filter);

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
          <h1 className="text-4xl md:text-6xl mb-4">Works</h1>
          <p className="text-xl text-gray-400">Selected projects and artworks</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 border transition-all ${
                  filter === category
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-gray-400 hover:border-white hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/works/${work.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 mb-4">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm text-gray-300">{work.description}</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl mb-1 group-hover:text-gray-400 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-gray-500">
                      {work.category} / {work.year}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No works found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
