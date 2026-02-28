"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { works } from "@/data/works";

export default function HomePage() {
  const featuredWorks = works.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 tracking-tight"
          >
            Creative Designer
            <br />& Illustrator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            視覚的なストーリーテリングを通じて、
            <br />
            ブランドと人々をつなぐデザインを創造します
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors"
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
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl">Featured Works</h2>
            <Link
              href="/works"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              View All
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/works/${work.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 mb-4">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl mb-1 group-hover:text-gray-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-gray-500">
                    {work.category} / {work.year}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl mb-6">
                デザインで世界を
                <br />
                より美しく
              </h2>
              <p className="text-gray-400 mb-6">
                アートとデザインの境界を探求し、独自の視点から作品を制作しています。
                ミニマリズムと機能美を追求し、時代を超えて愛される作品づくりを心がけています。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
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
              className="aspect-square overflow-hidden bg-gray-900"
            >
              <img
                src="https://seki-saki.com/wp-content/uploads/2025/09/名称未設定のアートワーク-15.jpeg"
                alt="about"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
