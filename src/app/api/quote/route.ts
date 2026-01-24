import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("QUOTE API HIT");

  try {
    const body = await req.json();
    console.log("Quote payload:", body);

    console.log("About to send email via Resend...");

    const result = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL!,
      to: process.env.QUOTE_TO_EMAIL!,
      subject: "New quote request",
      html: "<p>Test quote</p>",
    });

    console.log("Resend result:", result);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Quote send failed:", err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
