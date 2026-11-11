import { NextResponse } from "next/server";

/**
 * Contact form submission endpoint.
 *
 * Forwards form data to email via Resend (https://resend.com).
 *
 * Setup required:
 *   1. Sign up at resend.com (free — 100/day, 3,000/month).
 *   2. Set RESEND_API_KEY environment variable in Vercel project settings.
 *   3. Set CONTACT_TO_EMAIL to the destination address (e.g. "salesperth@pfp.com.au").
 *   4. (Optional) Set CONTACT_FROM_EMAIL once you've verified pfp.com.au in Resend.
 */
export const runtime = "nodejs";
export const maxDuration = 10; // seconds — cap function so a slow Resend can't burn quota

interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  industry?: string;
  productInterest?: string;
  office?: string;
  message?: string;
  // Honeypot — bots fill in hidden field; real users leave it empty
  website?: string;
  // Source page for routing context
  source?: string;
}

// Maximum length per field — anything beyond is rejected with 400.
// These align with realistic human enquiries; bots/abuse exceeds them.
const MAX_LENGTHS = {
  name: 200,
  company: 200,
  email: 320, // RFC 5321 max
  phone: 50,
  industry: 100,
  productInterest: 200,
  office: 100,
  message: 5000,
  source: 200,
} as const;

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per minute per IP
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return false;
}

function isValidEmail(email: string): boolean {
  // No commas/semicolons (prevents reply_to multi-recipient injection)
  if (/[,;\s<>]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Strip CRLF / control chars — defence-in-depth against header injection via subject etc. */
function singleLine(s: string): string {
  return s.replace(/[\r\n\t\v\f\u0000-\u001f\u007f]+/g, " ").trim();
}

function buildEmailHtml(p: ContactPayload): string {
  const rows: [string, string | undefined][] = [
    ["Name", p.name],
    ["Company", p.company],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Industry", p.industry],
    ["Product Interest", p.productInterest],
    ["Office", p.office],
    ["Source Page", p.source],
  ];
  const tableRows = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;background:#f5f7f4;font-weight:600;color:#15361c;width:160px">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e6ece4">${escapeHtml(value!)}</td></tr>`
    )
    .join("");

  const message = p.message
    ? `<h3 style="color:#15361c;margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;line-height:1.6;color:#333;background:#f5f7f4;padding:16px;border-left:3px solid #46b867">${escapeHtml(p.message)}</p>`
    : "";

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222">
      <h2 style="color:#15361c;border-bottom:3px solid #46b867;padding-bottom:8px">New Enquiry from PFP Website</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">${tableRows}</table>
      ${message}
      <p style="margin-top:32px;font-size:12px;color:#888">Submitted via pfp.com.au</p>
    </div>
  `;
}

export async function POST(req: Request) {
  // Origin check — only accept submissions from our own site (defence in depth against CSRF)
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      if (host !== "pfp.com.au" && host !== "www.pfp.com.au" && !host.endsWith(".vercel.app")) {
        return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  // Parse JSON separately so we can return 400 (not 500) on malformed input
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 }
    );
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 }
    );
  }

  const data = raw as ContactPayload;

  // Honeypot check — silently succeed on bot submissions, log for telemetry
  if (typeof data.website === "string" && data.website.trim()) {
    console.warn("[contact] honeypot tripped:", { ip, ua: req.headers.get("user-agent")?.slice(0, 200) });
    return NextResponse.json({ ok: true });
  }

  // Field length validation — reject oversized payloads early
  const dataRecord = data as unknown as Record<string, unknown>;
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const v = dataRecord[field];
    if (typeof v === "string" && v.length > max) {
      return NextResponse.json(
        { ok: false, error: `${field} exceeds maximum length of ${max} characters.` },
        { status: 400 }
      );
    }
  }

  if (!data.name?.trim() || !data.email?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(data.email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Strip CRLF/control chars from any field that ends up in email headers
  const sanitized: ContactPayload = {
    ...data,
    name: singleLine(data.name),
    company: data.company ? singleLine(data.company) : undefined,
    email: data.email.trim(),
    phone: data.phone ? singleLine(data.phone) : undefined,
    industry: data.industry ? singleLine(data.industry) : undefined,
    productInterest: data.productInterest ? singleLine(data.productInterest) : undefined,
    office: data.office ? singleLine(data.office) : undefined,
    source: data.source ? singleLine(data.source) : undefined,
    // message keeps newlines (it's the body) but is escaped on output
  };

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "salesperth@pfp.com.au";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "PFP Website <onboarding@resend.dev>";

  if (!apiKey) {
    // Production: hard-fail — never silently drop a real enquiry
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] CRITICAL: RESEND_API_KEY missing in production");
      return NextResponse.json(
        { ok: false, error: "Email service unavailable. Please call us directly." },
        { status: 503 }
      );
    }
    // Dev only: log without PII fields, return ok to keep UX working
    console.log("[contact] dev mode (no RESEND_API_KEY) — submission accepted, not sent", {
      ip,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  }

  const subject = singleLine(
    `Website Enquiry — ${sanitized.name}${sanitized.company ? ` (${sanitized.company})` : ""}${sanitized.industry ? ` — ${sanitized.industry}` : ""}${sanitized.productInterest ? ` — ${sanitized.productInterest}` : ""}`
  );

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: sanitized.email,
        subject,
        html: buildEmailHtml(sanitized),
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[contact] Resend error:", resp.status, errorText);
      return NextResponse.json(
        { ok: false, error: "Email service temporarily unavailable. Please try again or call us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] handler error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
