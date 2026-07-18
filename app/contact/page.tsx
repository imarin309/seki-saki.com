"use client";

import { useState, type SubmitEvent } from "react";
import Script from "next/script";
import { motion } from "motion/react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const CONTACT_API_URL = "https://api.seki-saki.com";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "border-b border-white/20 bg-transparent py-2 text-lg text-white placeholder-gray-600 transition-colors focus:border-white focus:outline-none";
const labelClassName = "text-xs uppercase tracking-widest text-gray-500";

function Field({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClassName}>
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className={fieldClassName}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={fieldClassName}
        />
      )}
    </label>
  );
}

export default function ContactPage() {
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          usage: formData.get("usage"),
          other: formData.get("other"),
          turnstileToken: formData.get("cf-turnstile-response"),
        }),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  };

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
            お仕事のご依頼・ご相談は下記フォームからお気軽にどうぞ。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {state === "success" ? (
            <p className="max-w-2xl text-xl text-white">
              送信しました。内容を確認の上、改めてご連絡いたします。
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex max-w-2xl flex-col gap-8"
            >
              <Field label="お名前（ハンドルネーム可）" name="name" required />
              <Field
                label="メールアドレス"
                name="email"
                type="email"
                required
              />
              <Field label="ご依頼内容" name="message" textarea required />
              <Field label="用途・使用媒体" name="usage" />
              <Field label="その他ご要望" name="other" textarea />

              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
              />
              <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />

              {state === "error" && (
                <p className="text-sm text-red-400">
                  送信に失敗しました。時間をおいて再度お試しください。
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="self-start border border-white/20 px-8 py-3 text-white transition-all hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state === "submitting" ? "送信中..." : "送信する"}
              </button>
            </form>
          )}
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
