"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@portfolio.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+81 (0)3-1234-5678",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tokyo, Japan",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h1 className="text-4xl md:text-6xl mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            プロジェクトのご相談やコラボレーションのお問い合わせ、お気軽にご連絡ください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-400">
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-400">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-400">
                  メッセージ
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white outline-none transition-colors resize-none text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors"
              >
                {submitted ? "送信完了しました！" : "送信する"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-8">連絡先情報</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1">
                      <info.icon size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">{info.label}</div>
                      <div className="text-lg">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl mb-4">ソーシャルメディア</h3>
              <div className="flex gap-4 flex-wrap">
                {["Instagram", "Twitter", "LinkedIn", "Behance"].map(
                  (platform, index) => (
                    <motion.a
                      key={platform}
                      href="#"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all"
                    >
                      {platform}
                    </motion.a>
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8">
              <h3 className="text-xl mb-4">営業時間</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>月 - 金</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>土日祝</span>
                  <span>休業</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
