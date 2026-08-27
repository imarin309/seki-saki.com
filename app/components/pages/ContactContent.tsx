"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Script from "next/script";
import { motion } from "motion/react";
import { PageHeader } from "@/app/components/PageHeader";
import { LABEL, fadeIn } from "@/app/design";
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
  "border-b border-line-strong bg-transparent py-2.5 text-base text-ink transition-colors focus:border-terracotta focus:outline-none";

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
      <span className={LABEL}>
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          minLength={required ? 1 : undefined}
          maxLength={maxLength}
          rows={5}
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
    const getField = (field: string): string => {
      const value = formData.get(field);
      return typeof value === "string" ? value : "";
    };

    const turnstileToken = getField("cf-turnstile-response");
    if (!turnstileToken) {
      setState("error");
      return;
    }

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: getField("name").trim(),
          email: getField("email").trim(),
          subject: getField("subject").trim(),
          message: getField("message"),
          turnstileToken,
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
    <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
      <div>
        <PageHeader
          kicker={dict.contact.kicker}
          title={dict.contact.title}
          description={dict.contact.intro}
        />

        <motion.div {...fadeIn(0.3)}>
          {state === "success" ? (
            <p className="max-w-2xl font-display text-xl leading-loose text-ink">
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
              className="flex max-w-2xl flex-col gap-10"
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
                onReady={renderTurnstileWidget}
              />
              <div ref={turnstileContainerRef} />

              {state === "error" && (
                <p className="text-sm text-terracotta-dark">
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
                className="self-start border border-ink px-10 py-3.5 font-display text-sm tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
              >
                {state === "submitting"
                  ? dict.contact.formSubmittingLabel
                  : dict.contact.formSubmitLabel}
              </button>
            </form>
          )}
        </motion.div>

        <motion.p
          {...fadeIn(0.5)}
          className="mt-24 max-w-xl border-t border-line pt-6 text-xs leading-loose text-ink-muted"
        >
          {dict.contact.privacyNote}
        </motion.p>
      </div>
    </div>
  );
}
