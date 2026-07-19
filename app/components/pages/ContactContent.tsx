"use client";

import { motion } from "motion/react";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/app/meta";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function buildMailtoHref(
  subject: string,
  bodyLines: string[],
  email: string
): string {
  const params = new URLSearchParams({
    subject,
    body: bodyLines.join("\r\n"),
  });
  return `mailto:${email}?${params.toString()}`;
}

export default function ContactContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const mailtoHref = buildMailtoHref(
    dict.contact.mailtoSubject,
    dict.contact.mailtoBodyLines,
    CONTACT_EMAIL
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="mb-6 text-4xl md:text-6xl">{dict.contact.title}</h1>
          <p className="max-w-3xl text-xl text-gray-400">
            {dict.contact.intro}
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
              {dict.contact.emailLabel}
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
              {dict.contact.instagramLabel}
            </span>
            <span className="text-2xl tracking-wide text-white md:text-3xl">
              {dict.contact.instagramHandle}
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-xl text-sm leading-relaxed text-gray-600"
        >
          {dict.contact.privacyNote}
        </motion.p>
      </div>
    </div>
  );
}
