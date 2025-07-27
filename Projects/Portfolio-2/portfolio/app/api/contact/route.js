
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const smsBody = `
New Contact Form Submission of Your Portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
  `;

  try {
    const response = await client.messages.create({
      body: smsBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER,
    });

    console.log("SMS sent:", response.sid);

    return NextResponse.json({ status: "OK", message: "SMS sent!" });
  } catch (error) {
    console.error("Twilio error:", error);
    return NextResponse.json({ status: "ERROR", message: "SMS failed" }, { status: 500 });
  }
}
