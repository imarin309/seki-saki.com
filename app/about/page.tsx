"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function AboutPage() {
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
          <h1 className="mb-6 text-4xl md:text-6xl">About Me</h1>
          <p className="max-w-3xl text-xl text-gray-400">
            デザインとアートの力で、人々の心に響く作品を創り続けています。
          </p>
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
            <h2 className="mb-6 text-3xl">クリエイティブな視点から</h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              はじめまして。世木口と申します。
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              芯のある美しい女性を中心にイラストレーションを描いています。
              また、ゆるくて可愛いイラストも得意です。
            </p>
            <p className="leading-relaxed text-gray-400">
              現在は会社員として勤めながら、フリーランスでイラストレーターとして活動しております。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
