import { NextRequest, NextResponse } from "next/server";

/**
 * Email subscription endpoint.
 * In production, connect to your ESP (ConvertKit, MailerLite, Buttondown, etc.).
 * For now, logs to console and returns success.
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Replace with your ESP integration
    // Example for ConvertKit:
    // await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, api_key: process.env.CONVERTKIT_API_KEY }),
    // });

    // Example for MailerLite:
    // await fetch("https://connect.mailerlite.com/api/subscribers", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    //   },
    //   body: JSON.stringify({ email, groups: [GROUP_ID] }),
    // });

    console.log("[Subscribe] New subscriber:", email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}