import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

// Fulfills a credit purchase on return from Stripe. Fulfillment is keyed off the
// PAID Stripe session (whose id is a secret only the buyer receives in their
// success_url) and the buyer email stored in the session metadata — NOT the
// returning browser's auth state. Requiring the browser to be re-authenticated
// as the buyer here was fragile across the cross-site redirect and could
// silently drop credits. Idempotent via the unique stripe_session_id.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const checkout = await getStripe().checkout.sessions.retrieve(sessionId);

    if (checkout.payment_status !== "paid" || checkout.metadata?.type !== "credits") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    const buyerEmail = checkout.metadata?.userEmail;
    const creditsToAdd = parseInt(checkout.metadata?.credits ?? "0", 10);
    if (!buyerEmail || !creditsToAdd || creditsToAdd <= 0) {
      return NextResponse.json({ error: "Invalid purchase metadata" }, { status: 400 });
    }

    // Idempotent: only credit if this session hasn't been fulfilled yet
    // (the webhook, or an earlier return, may have already handled it).
    const inserted = await sql`
      INSERT INTO purchases ("userId", stripe_session_id, pack, credits_added, amount_cents)
      SELECT id, ${checkout.id}, ${checkout.metadata?.pack ?? "unknown"}, ${creditsToAdd}, ${checkout.amount_total ?? 0}
      FROM users WHERE email = ${buyerEmail}
      ON CONFLICT (stripe_session_id) DO NOTHING
      RETURNING id
    `;

    if (inserted.length > 0) {
      await sql`UPDATE users SET credits = credits + ${creditsToAdd} WHERE email = ${buyerEmail}`;
    }

    const rows = await sql`SELECT credits FROM users WHERE email = ${buyerEmail}`;
    const credits = (rows[0] as { credits: number } | undefined)?.credits ?? 0;

    return NextResponse.json({
      ok: true,
      credits,
      creditsAdded: inserted.length > 0 ? creditsToAdd : 0,
    });
  } catch (err) {
    console.error("Credit verify error:", err);
    return NextResponse.json({ error: "Couldn't verify payment" }, { status: 500 });
  }
}
