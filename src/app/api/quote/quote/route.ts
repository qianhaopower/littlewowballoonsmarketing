import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c] as string));
}

export async function POST(req: Request) {
  console.log("API /api/quote hit");
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY is missing. Check your .env.local in project root and restart dev server." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const mobile = String(body.mobile ?? "").trim();
    const eventType = String(body.eventType ?? "").trim();
    const eventDate = String(body.eventDate ?? "").trim();
    const suburb = String(body.suburb ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, mobile" },
        { status: 400 }
      );
    }

    const toEmail = process.env.QUOTE_TO_EMAIL;
    const fromEmail = process.env.QUOTE_FROM_EMAIL;

    if (!toEmail || !fromEmail) {
      return NextResponse.json(
        { ok: false, error: "QUOTE_TO_EMAIL or QUOTE_FROM_EMAIL missing in env" },
        { status: 500 }
      );
    }

    // Owner email
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Quote Request — ${name}${suburb ? ` (${suburb})` : ""}`,
      html: `
        <h2>New Quote Request</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Mobile:</b> ${escapeHtml(mobile)}</p>
        <p><b>Event type:</b> ${escapeHtml(eventType || "-")}</p>
        <p><b>Event date:</b> ${escapeHtml(eventDate || "-")}</p>
        <p><b>Suburb / Postcode:</b> ${escapeHtml(suburb || "-")}</p>
        <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email,
    });

    // Customer confirmation email
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `We received your request 🎈 — Little Wow Balloons`,
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for contacting <b>Little Wow Balloons</b>! 🎈</p>
        <p>We’ve received your request and will get back to you soon (usually within 24 hours).</p>
        <p><b>Event type:</b> ${escapeHtml(eventType || "-")}<br/>
           <b>Event date:</b> ${escapeHtml(eventDate || "-")}<br/>
           <b>Suburb / Postcode:</b> ${escapeHtml(suburb || "-")}</p>
        <p>If anything changes, just reply to this email.</p>
        <p>— Little Wow Balloons</p>
      `,
      replyTo: toEmail,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
