import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only handle credit purchases
    if (session.metadata?.type !== "credits") {
      return NextResponse.json({ received: true });
    }

    const userEmail = session.metadata.userEmail;
    const creditsToAdd = parseInt(session.metadata.credits, 10);
    const pack = session.metadata.pack;

    if (!userEmail || isNaN(creditsToAdd)) {
      console.error("Missing metadata in credit purchase:", session.metadata);
      return NextResponse.json({ error: "Invalid metadata" }, { status: 400 });
    }

    // Record purchase first; only credit if this session wasn't already fulfilled
    // (the verify-on-return route may have beaten us to it)
    try {
      const inserted = await sql`
        INSERT INTO purchases ("userId", stripe_session_id, pack, credits_added, amount_cents)
        SELECT id, ${session.id}, ${pack}, ${creditsToAdd}, ${session.amount_total ?? 0}
        FROM users WHERE email = ${userEmail}
        ON CONFLICT (stripe_session_id) DO NOTHING
        RETURNING id
      `;

      if (inserted.length > 0) {
        await sql`
          UPDATE users SET credits = credits + ${creditsToAdd}
          WHERE email = ${userEmail}
        `;
        console.log(`✅ Added ${creditsToAdd} credits to ${userEmail}`);
      }
    } catch (err) {
      console.error("Failed to add credits:", err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
