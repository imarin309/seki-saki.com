interface Env {
  RESEND_API_KEY: string;
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

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const { name, email, message, usage, other, turnstileToken } = payload;

  if (
    !isNonEmptyString(name, 200) ||
    !isValidEmail(email) ||
    !isNonEmptyString(message) ||
    !isNonEmptyString(turnstileToken, 2000) ||
    (usage !== undefined && usage !== "" && !isNonEmptyString(usage, 200)) ||
    (other !== undefined && other.length > MAX_LENGTH)
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

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `お問い合わせフォーム <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      reply_to: email,
      subject: "【seki-saki.com】お問い合わせ",
      text: emailBody,
    }),
  });

  if (!resendRes.ok) {
    return jsonResponse({ error: "email_failed" }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
