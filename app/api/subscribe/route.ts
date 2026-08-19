import { NextRequest, NextResponse } from "next/server";

/**
 * Email subscription endpoint — ConvertKit (Kit) integration.
 * Subscribes email to the specified form.
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!API_KEY || !FORM_ID) {
      console.error("[Subscribe] Missing ConvertKit config");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, api_key: API_KEY }),
    });

    const data = await res.json();

    if (!res.ok) {
      // ConvertKit returns { error: "message" } on failure
      console.error("[Subscribe] ConvertKit error:", data);
      return NextResponse.json({ error: data.error || "Subscription failed" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}