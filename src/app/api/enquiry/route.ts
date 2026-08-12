import { NextRequest, NextResponse } from "next/server";
import { getTransport, mailConfig } from "@/lib/mailer";

// nodemailer needs Node APIs (net/tls) - force the Node.js runtime, not Edge.
export const runtime = "nodejs";

const FIELD_LABELS: Record<string, string> = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  preferredTime: "Preferred Time",
  timeOfDay: "Preferred Time",
  service: "Service",
  symptom: "Primary Emergency Symptom",
  visitTypes: "Reason for Visit",
  message: "Message",
  notes: "Notes",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Longest value accepted in any single field. Anything beyond this is a bot. */
const MAX_FIELD = 2000;

/**
 * In-memory rate limit: 5 submissions per IP per 10 minutes.
 *
 * Deliberately simple. This runs per server instance, so it resets on deploy
 * and does not coordinate across instances - it is a speed bump against a
 * script hammering the mailbox, not a security control. If this page ever
 * takes serious abuse, move to a shared store (Upstash/Redis) or put the
 * platform's own rate limiting in front of the route.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  // x-forwarded-for is set by the hosting proxy; first entry is the client.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please call us instead - we'll pick up." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field hidden from humans via CSS. Anything that fills it is a
  // bot. Return 200 so the bot believes it succeeded and does not retry with a
  // different strategy.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const formType = typeof body.formType === "string" ? body.formType : "Website Enquiry";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  /*
    Server-side validation - never trust the client alone.

    The client checks are for UX; these are the ones that actually hold, since
    anyone can POST this endpoint directly. They intentionally mirror the rules
    in lib/validation.ts so a submission cannot pass in the browser and fail
    here (or vice versa).
  */
  const digits = phone.replace(/\D/g, "");

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 }
    );
  }
  // Exactly 10 - must match validatePhone() in lib/validation.ts, or a
  // submission could pass in the browser and be rejected here.
  if (digits.length !== 10) {
    return NextResponse.json(
      { error: "Please enter a 10-digit phone number." },
      { status: 400 }
    );
  }
  if (email && !emailRe.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Reject oversized payloads before doing any work on them.
  for (const raw of Object.values(body)) {
    if (typeof raw === "string" && raw.length > MAX_FIELD) {
      return NextResponse.json(
        { error: "That message is too long. Please shorten it." },
        { status: 400 }
      );
    }
  }

  // Build a readable list of all submitted fields.
  // `company` is the honeypot and must never appear in the email.
  const skip = new Set(["formType", "company"]);
  const rows: { label: string; value: string }[] = [];
  for (const [key, raw] of Object.entries(body)) {
    if (skip.has(key)) continue;
    let value = "";
    if (Array.isArray(raw)) value = raw.join(", ");
    else if (raw != null) value = String(raw);
    if (!value.trim()) continue;
    rows.push({ label: FIELD_LABELS[key] || key, value: value.trim() });
  }

  const textBody = rows.map((r) => `${r.label}: ${r.value}`).join("\n");
  const htmlBody = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#143C50;max-width:600px">
      <h2 style="color:#1E6076;margin-bottom:4px">New ${escapeHtml(formType)}</h2>
      <p style="color:#5C7098;font-size:13px;margin-top:0">Submitted via the Hampton Family Dental website.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:12px">
        ${rows
          .map(
            (r) => `<tr>
              <td style="padding:8px 12px;border:1px solid #DDE4EC;background:#F2F5F9;font-weight:bold;width:180px">${escapeHtml(
                r.label
              )}</td>
              <td style="padding:8px 12px;border:1px solid #DDE4EC">${escapeHtml(
                r.value
              ).replace(/\n/g, "<br>")}</td>
            </tr>`
          )
          .join("")}
      </table>
    </div>`;

  try {
    const transport = getTransport();
    await transport.sendMail({
      from: `"${mailConfig.fromName}" <${mailConfig.from}>`,
      to: mailConfig.to,
      replyTo: email || undefined,
      subject: `${formType}${name ? ` - ${name}` : ""}`,
      text: textBody,
      html: htmlBody,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry email failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please call us or try again later." },
      { status: 500 }
    );
  }
}
