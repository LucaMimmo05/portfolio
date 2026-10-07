import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const LIMITS = { name: 100, email: 254, messageMin: 10, messageMax: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Humans take a few seconds to fill the form; bots usually post instantly
const MIN_FILL_MS = 3000;

// Best-effort rate limit: 5 messages per IP every 10 minutes. On serverless this is
// per instance, which is enough to stop casual floods without adding a database.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: NextRequest) {
  // Only accept submissions coming from this site
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return bad("Forbidden.", 403);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return bad("Too many messages. Try again later.", 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot filled or form sent too fast: pretend it worked, send nothing
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().replace(/[\r\n]+/g, " ") : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) return bad("All fields are required.");
  if (name.length > LIMITS.name) return bad("Name is too long.");
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return bad("Invalid email address.");
  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) return bad("Message length is not valid.");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "lucamimmo2005@outlook.it",
    subject: `Portfolio: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`,
    replyTo: email,
  });

  if (error) return bad("Failed to send email.", 500);
  return NextResponse.json({ ok: true });
}
