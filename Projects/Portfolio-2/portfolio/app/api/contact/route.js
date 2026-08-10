import { NextResponse } from "next/server";

// Sends the contact form as an email via Resend (https://resend.com)
// Required env var on Vercel: RESEND_API_KEY
// Free tier: emails deliver to the address you signed up with (CONTACT_EMAIL).
export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { status: "ERROR", message: "All fields are required" },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_EMAIL || "abdullahazhar202rr@gmail.com";

  const text = `New contact form submission from your portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to,
        reply_to: email, // hitting "Reply" in Gmail answers the visitor directly
        subject: `Portfolio contact: ${subject}`,
        text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return NextResponse.json(
        { status: "ERROR", message: "Email failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "OK", message: "Email sent!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { status: "ERROR", message: "Email failed" },
      { status: 500 }
    );
  }
}
