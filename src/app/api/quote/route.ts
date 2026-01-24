import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const mobile = String(body.mobile ?? "").trim();
    const eventType = String(body.eventType ?? "").trim(); // delivered | live
    const eventDate = String(body.eventDate ?? "").trim();
    const suburb = String(body.suburb ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    // Basic required validation (server-side)
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
        { ok: false, error: "Server email config missing" },
        { status: 500 }
      );
    }

    // 1) Email to YOU (lead notification)
    const ownerSubject = `New Quote Request — ${name}${suburb ? ` (${suburb})` : ""}`;
    const ownerHtml = `
      <h2>New Quote Request</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Mobile:</b> ${escapeHtml(mobile)}</p>
      <p><b>Event type:</b> ${escapeHtml(eventType || "-")}</p>
      <p><b>Event date:</b> ${escapeHtml(eventDate || "-")}</p>
      <p><b>Suburb / Postcode:</b> ${escapeHtml(suburb || "-")}</p>
      <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Submitted from the Little Wow Balloons quote form.</p>
    `;

    // 2) Email to CUSTOMER (confirmation)
    const customerSubject = `🎈 We've received your request — Little Wow Balloons`;

    const customerHtml = `
      <p>Hi ${escapeHtml(name)},</p>

      <p>
        Thanks for getting in touch with <strong>Little Wow Balloons</strong>! 🎈<br/>
        We've received your request and will get back to you within
        <strong>24 hours</strong> with pricing and availability.
      </p>

      <h3>Your request summary</h3>
      <ul>
        <li><strong>Event type:</strong> ${escapeHtml(eventType || "-")}</li>
        <li><strong>Event date:</strong> ${escapeHtml(eventDate || "-")}</li>
        <li><strong>Suburb / Postcode:</strong> ${escapeHtml(suburb || "-")}</li>
      </ul>

      <p>
        If you need to make any changes, just reply to this email —
        it comes straight to me.
      </p>

      <p>
        Looking forward to helping make your event extra special!
      </p>

      <p>
        Warm regards,<br/>
        <strong>Hao Qian</strong><br/>
        Little Wow Balloons 🎈
      </p>
`;

    // Send both (sequential for simplicity)
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: ownerSubject,
      html: ownerHtml,
      replyTo: email, // so you can reply straight to customer
    });

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: customerSubject,
      html: customerHtml,
      replyTo: toEmail, // customer replies go to you
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
