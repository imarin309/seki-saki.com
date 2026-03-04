"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Cloudflare Postmark でメール送信を実装
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded border border-white/20 bg-[#0a0a0a] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white/50 transition-colors";
  const labelClass = "mb-2 block text-sm text-gray-300";

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl md:text-6xl">Contact</h1>
          <p className="text-xl text-gray-400">
            お仕事のご依頼・ご相談はこちらからお気軽にどうぞ。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl rounded border border-white/10 bg-[#111111] p-8"
        >
          {submitted ? (
            <div className="py-12 text-center">
              <p className="mb-2 text-2xl text-white">送信しました</p>
              <p className="text-gray-400">
                お問い合わせありがとうございます。確認次第ご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  お名前
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  件名 / お問い合わせの種類
                </label>
                <select
                  id="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="illust">イラスト制作依頼</option>
                  <option value="design">デザイン相談</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  メッセージ
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="ご依頼の内容をご記入ください"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="rounded border border-white/10 bg-[#0a0a0a] p-4">
                <p className="mb-3 text-xs leading-relaxed text-gray-400">
                  ご入力いただいた個人情報（お名前・メールアドレス等）は、お問い合わせへの回答および関連する連絡のみを目的として使用いたします。ご本人の同意なく第三者への提供や目的外での利用は行いません。
                </p>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-white"
                  />
                  <span className="text-sm text-gray-300">
                    上記の内容を確認しました
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreed}
                className="w-full rounded border border-white/20 bg-white py-3 font-medium text-black transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                送信する
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
