"use client";

import { motion } from "motion/react";

const skills = [
  { name: "Illustration", level: 95 },
  { name: "Graphic Design", level: 90 },
  { name: "Digital Art", level: 88 },
  { name: "Branding", level: 85 },
  { name: "UI/UX Design", level: 82 },
];

const experience = [
  {
    year: "2024 - Present",
    title: "Senior Designer",
    company: "Creative Studio",
    description: "デジタルアート、ブランディング、ビジュアルデザインを担当",
  },
  {
    year: "2022 - 2024",
    title: "Illustrator & Designer",
    company: "Design Agency",
    description: "クライアントワーク、イラストレーション、グラフィックデザイン",
  },
  {
    year: "2020 - 2022",
    title: "Freelance Designer",
    company: "Self-employed",
    description: "様々なクライアントとのプロジェクト、個人作品制作",
  },
];

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
          <h1 className="text-4xl md:text-6xl mb-6">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            デザインとアートの力で、人々の心に響く作品を創り続けています。
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div className="aspect-[4/5] overflow-hidden bg-gray-900">
            <img
              src="https://seki-saki.com/wp-content/uploads/2025/09/名称未設定のアートワーク-15.jpeg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl mb-6">クリエイティブな視点から</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              私は、視覚的なストーリーテリングを通じて、ブランドと人々をつなぐデザインを創造することに情熱を注いでいます。
              ミニマリズムと機能美を追求し、時代を超えて愛される作品づくりを心がけています。
            </p>
            <p className="text-gray-400 mb-4 leading-relaxed">
              デジタルアート、イラストレーション、グラフィックデザインなど、
              幅広い分野で活動しており、各プロジェクトに独自の視点とアプローチをもたらしています。
            </p>
            <p className="text-gray-400 leading-relaxed">
              デザインは単なる装飾ではなく、コミュニケーションの手段であり、
              問題解決のツールであると考えています。
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl mb-12">スキル</h2>
          <div className="max-w-3xl">
            {skills.map((skill, index) => (
              <div key={skill.name} className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-lg">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-1 bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mb-12">経験</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-white/20 pl-6 pb-8"
              >
                <div className="text-sm text-gray-500 mb-2">{exp.year}</div>
                <h3 className="text-2xl mb-1">{exp.title}</h3>
                <div className="text-gray-400 mb-3">{exp.company}</div>
                <p className="text-gray-500">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
