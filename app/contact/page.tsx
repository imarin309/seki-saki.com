"use client";

import { motion } from "motion/react";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/app/meta";

const mailtoHref = (() => {
  const params = new URLSearchParams({
    subject: "イラスト制作のご依頼",
    body: [
      "お名前（ハンドルネーム可）：",
      "ご依頼内容：",
      "用途・使用媒体：",
      "その他ご要望：",
    ].join("\r\n"),
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
})();

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="mb-6 text-4xl md:text-6xl">Contact</h1>
          <p className="max-w-3xl text-xl text-gray-400">
            お仕事のご依頼・ご相談はメールまたは Instagram の DM
            からお気軽にどうぞ。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-10"
        >
          <a
            href={mailtoHref}
            className="group inline-flex flex-col gap-2 border-b border-white/20 pb-4 transition-colors hover:border-white"
          >
            <span className="text-xs uppercase tracking-widest text-gray-500 transition-colors group-hover:text-gray-300">
              Email
            </span>
            <span className="text-2xl tracking-wide text-white md:text-3xl">
              {CONTACT_EMAIL}
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col gap-2 border-b border-white/20 pb-4 transition-colors hover:border-white"
          >
            <span className="text-xs uppercase tracking-widest text-gray-500 transition-colors group-hover:text-gray-300">
              Instagram
            </span>
            <span className="text-2xl tracking-wide text-white md:text-3xl">
              @_sekisaki
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-xl text-sm leading-relaxed text-gray-600"
        >
          ご依頼の際にいただいた個人情報は、業務上の連絡・対応の目的にのみ使用し、第三者への提供は行いません。
        </motion.p>
      </div>
    </div>
  );
}
