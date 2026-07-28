export interface Env {
  EMAIL: SendEmail;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
}

// 許可オリジンは設定として一元管理する（本番 + 既存の開発方法である `pnpm dev`（Next.js デフォルトの 3000 番）用）
const ALLOWED_ORIGINS = [
  "https://seki-saki.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const CONTACT_EMAIL = "contact@seki-saki.com";
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const SUBJECT_MAX_LENGTH = 200;
const MESSAGE_MAX_LENGTH = 5000;
const TURNSTILE_TOKEN_MAX_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAllowedOrigin(origin: string | null): origin is string {
  return origin !== null && ALLOWED_ORIGINS.includes(origin);
}

function isValidOptionalString(value: unknown, maxLength: number): boolean {
  return (
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.length <= maxLength)
  );
}

function isValidMessage(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length >= 1 &&
    value.length <= MESSAGE_MAX_LENGTH
  );
}

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= EMAIL_MAX_LENGTH &&
    EMAIL_PATTERN.test(value)
  );
}

function isValidTurnstileToken(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= TURNSTILE_TOKEN_MAX_LENGTH
  );
}

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(
  data: unknown,
  status: number,
  origin?: string
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(origin ? corsHeaders(origin) : {}),
    },
  });
}

async function verifyTurnstile(
  token: string,
  secret: string
): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

function buildEmailText(name: string, email: string, message: string): string {
  return [
    "seki-saki.com からお問い合わせがありました。",
    "",
    "名前:",
    name || "（未記入）",
    "",
    "メールアドレス:",
    email,
    "",
    "お問い合わせ内容:",
    message,
  ].join("\n");
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405);
    }

    const contentType = request.headers.get("Content-Type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse({ error: "invalid_content_type" }, 400);
    }

    if (!isAllowedOrigin(origin)) {
      return jsonResponse({ error: "invalid_origin" }, 403);
    }

    let payload: ContactPayload;
    try {
      payload = await request.json();
    } catch {
      console.log("contact.validation_failed");
      return jsonResponse({ error: "invalid_json" }, 400, origin);
    }

    if (typeof payload !== "object" || payload === null) {
      console.log("contact.validation_failed");
      return jsonResponse({ error: "invalid_input" }, 400, origin);
    }

    const { name, email, subject, message, turnstileToken } = payload;

    if (
      !isValidOptionalString(name, NAME_MAX_LENGTH) ||
      !isValidEmail(email) ||
      !isValidOptionalString(subject, SUBJECT_MAX_LENGTH) ||
      !isValidMessage(message) ||
      !isValidTurnstileToken(turnstileToken)
    ) {
      console.log("contact.validation_failed");
      return jsonResponse({ error: "invalid_input" }, 400, origin);
    }

    const turnstileOk = await verifyTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY
    );
    if (!turnstileOk) {
      console.log("contact.turnstile_failed");
      return jsonResponse({ error: "turnstile_failed" }, 403, origin);
    }

    const trimmedSubject = subject?.trim();
    const mailSubject = trimmedSubject
      ? `[seki-saki.com] ${trimmedSubject}`
      : "[seki-saki.com] お問い合わせ";

    try {
      await env.EMAIL.send({
        to: CONTACT_EMAIL,
        from: CONTACT_EMAIL,
        replyTo: email,
        subject: mailSubject,
        text: buildEmailText(name?.trim() ?? "", email, message),
      });
    } catch {
      console.log("contact.email_failed");
      return jsonResponse({ error: "email_failed" }, 500, origin);
    }

    console.log("contact.success");
    return jsonResponse({ ok: true }, 200, origin);
  },
};

export default worker;
