export interface Env {
  EMAIL: SendEmail;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  usage?: string;
  other?: string;
  turnstileToken?: string;
}

const ALLOWED_ORIGIN = "https://seki-saki.com";
const CONTACT_EMAIL = "contact@seki-saki.com";
const MAX_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown, maxLength = MAX_LENGTH): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 320 &&
    EMAIL_PATTERN.test(value)
  );
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405);
    }

    let payload: ContactPayload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "invalid_json" }, 400);
    }

    if (typeof payload !== "object" || payload === null) {
      return jsonResponse({ error: "invalid_input" }, 400);
    }

    const { name, email, message, usage, other, turnstileToken } = payload;

    if (
      !isNonEmptyString(name, 200) ||
      !isValidEmail(email) ||
      !isNonEmptyString(message) ||
      !isNonEmptyString(turnstileToken, 2000) ||
      (usage !== undefined && usage !== "" && !isNonEmptyString(usage, 200)) ||
      (other !== undefined &&
        (typeof other !== "string" || other.length > MAX_LENGTH))
    ) {
      return jsonResponse({ error: "invalid_input" }, 400);
    }

    const ip = request.headers.get("CF-Connecting-IP");
    const turnstileOk = await verifyTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      ip,
    );
    if (!turnstileOk) {
      return jsonResponse({ error: "turnstile_failed" }, 400);
    }

    const emailBody = [
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `ご依頼内容: ${message}`,
      `用途・使用媒体: ${usage || "（記載なし）"}`,
      `その他ご要望: ${other || "（記載なし）"}`,
    ].join("\n");

    try {
      await env.EMAIL.send({
        to: CONTACT_EMAIL,
        from: `お問い合わせフォーム <${CONTACT_EMAIL}>`,
        replyTo: email,
        subject: "【seki-saki.com】お問い合わせ",
        text: emailBody,
      });
    } catch {
      return jsonResponse({ error: "email_failed" }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  },
};

export default worker;
