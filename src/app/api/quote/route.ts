// app/api/quote/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  console.log("QUOTE API HIT");

  try {
    const body = await req.json();
    console.log("Quote payload:", body);

    const {
      name,
      email,
      mobile, // ✅ added
      eventType,
      eventDate,
      suburb,
      message,
    } = body;

    console.log("Parsed fields:", {
      name,
      email,
      mobile,
      eventType,
      eventDate,
      suburb,
    });

    // ---------- ADMIN EMAIL ----------
    console.log("About to send ADMIN email via Resend...");

    const adminResult = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL!,
      to: process.env.QUOTE_TO_EMAIL!,
      replyTo: email, // so you can reply directly to customer
      subject: "New quote request — Little Wow Balloons",
      html: `
        <h2>New quote request 🎈</h2>

        <p><b>Name:</b> ${name}</p>
        <p>
          <b>Mobile:</b>
          ${
            mobile
              ? `<a href="tel:${mobile}" style="color:#2563eb; text-decoration:none;">${mobile}</a>`
              : "-"
          }
        </p>
        <p><b>Email:</b> ${email}</p>

        <p><b>Event type:</b> ${eventType ?? "-"}</p>
        <p><b>Event date:</b> ${eventDate ?? "-"}</p>
        <p><b>Suburb:</b> ${suburb ?? "-"}</p>

        <p><b>Message:</b><br/>${message ?? "-"}</p>
      `,
    });

    console.log("Admin email result:", adminResult);

    if (adminResult.error) {
      console.error("ADMIN email failed:", adminResult.error);
      throw new Error("Admin email failed");
    }

    // ---------- CUSTOMER EMAIL ----------
    console.log("About to send CUSTOMER confirmation email...");

    const customerResult = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL!,
      to: email,
      subject: "We received your request 🎈 — Little Wow Balloons",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting <b>Little Wow Balloons</b>! 🎈</p>
        <p>We’ve received your quote request and will get back to you within 24 hours.</p>

        <h4>Your details</h4>
        <p><b>Event type:</b> ${eventType ?? "-"}</p>
        <p><b>Event date:</b> ${eventDate ?? "-"}</p>
        <p><b>Suburb:</b> ${suburb ?? "-"}</p>

        <p>If anything changes, just reply to this email.</p>
        <p>— Little Wow Balloons</p>
      `,
    });

    console.log("Customer email result:", customerResult);

    if (customerResult.error) {
      console.error("CUSTOMER email failed:", customerResult.error);
      throw new Error("Customer email failed");
    }

    console.log("QUOTE FLOW COMPLETE ✅");

    return Response.json({
      ok: true,
      adminMessageId: adminResult.data?.id,
      customerMessageId: customerResult.data?.id,
    });
  } catch (err) {
    console.error("Quote send failed ❌", err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
