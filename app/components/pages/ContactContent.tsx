"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Script from "next/script";
import { motion } from "motion/react";
import { INSTAGRAM_URL } from "@/app/meta";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

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
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  maxLength?: number;
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
          minLength={required ? 1 : undefined}
          maxLength={maxLength}
          rows={4}
          className={fieldClassName}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          maxLength={maxLength}
          className={fieldClassName}
        />
      )}
    </label>
  );
}

export default function ContactContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [state, setState] = useState<SubmitState>("idle");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const renderTurnstileWidget = () => {
    if (
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetIdRef.current !== null
    ) {
      return;
    }
    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      { sitekey: TURNSTILE_SITE_KEY }
    );
  };

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
          subject: formData.get("subject"),
          message: formData.get("message"),
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
      // Turnstileトークンはsingle-useのため、失敗後に再送信できるようウィジェットをリセットする
      if (turnstileWidgetIdRef.current !== null) {
        window.turnstile?.reset(turnstileWidgetIdRef.current);
      }
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
          <h1 className="mb-6 text-4xl md:text-6xl">{dict.contact.title}</h1>
          <p className="max-w-3xl text-xl text-gray-400">
            {dict.contact.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {state === "success" ? (
            <p className="max-w-2xl text-xl text-white">
              {dict.contact.formSuccessLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex max-w-2xl flex-col gap-8"
            >
              <Field
                label={dict.contact.formNameLabel}
                name="name"
                maxLength={100}
              />
              <Field
                label={dict.contact.formEmailLabel}
                name="email"
                type="email"
                required
                maxLength={254}
              />
              <Field
                label={dict.contact.formSubjectLabel}
                name="subject"
                maxLength={200}
              />
              <Field
                label={dict.contact.formMessageLabel}
                name="message"
                textarea
                required
                maxLength={5000}
              />

              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
                onLoad={renderTurnstileWidget}
              />
              <div ref={turnstileContainerRef} />

              {state === "error" && (
                <p className="text-sm text-red-400">
                  {dict.contact.formErrorLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="self-start border border-white/20 px-8 py-3 text-white transition-all hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state === "submitting"
                  ? dict.contact.formSubmittingLabel
                  : dict.contact.formSubmitLabel}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
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
