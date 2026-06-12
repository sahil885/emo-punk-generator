import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const checkout = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      checkout.payment_status !== "paid" ||
      checkout.metadata?.type !== "credits" ||
      checkout.metadata?.userEmail !== userEmail
    ) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    const creditsToAdd = parseInt(checkout.metadata.credits ?? "0", 10);
    if (!creditsToAdd || creditsToAdd <= 0) {
      return NextResponse.json({ error: "Invalid credit amount" }, { status: 400 });
    }

    // Idempotent: only credit if this checkout session hasn't been recorded yet
    // (the webhook may have already fulfilled it)
    const inserted = await sql`
      INSERT INTO purchases ("userId", stripe_session_id, pack, credits_added, amount_cents)
      SELECT id, ${checkout.id}, ${checkout.metadata.pack ?? "unknown"}, ${creditsToAdd}, ${checkout.amount_total ?? 0}
      FROM users WHERE email = ${userEmail}
      ON CONFLICT (stripe_session_id) DO NOTHING
      RETURNING id
    `;

    if (inserted.length > 0) {
      await sql`UPDATE users SET credits = credits + ${creditsToAdd} WHERE email = ${userEmail}`;
    }

    const rows = await sql`SELECT credits FROM users WHERE email = ${userEmail}`;
    const credits = (rows[0] as { credits: number } | undefined)?.credits ?? 0;

    return NextResponse.json({ ok: true, credits, creditsAdded: inserted.length > 0 ? creditsToAdd : 0 });
  } catch (err) {
    console.error("Credit verify error:", err);
    return NextResponse.json({ error: "Couldn't verify payment" }, { status: 500 });
  }
}
