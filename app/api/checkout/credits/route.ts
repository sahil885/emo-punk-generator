import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { PACKS, discountedAmount, isPackId } from "@/lib/pricing";
import { getActiveOffer } from "@/lib/offer";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in to buy credits" }, { status: 401 });
  }

  const { pack } = (await req.json()) as { pack?: unknown };
  if (!isPackId(pack)) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }
  const packInfo = PACKS[pack];

  // Re-check the first-song offer here rather than trusting the client's
  // countdown — this is where the discount is actually decided.
  const offer = await getActiveOffer(session.user.email);
  const amount = offer ? discountedAmount(packInfo, offer.percent) : packInfo.amount;

  // A discounted checkout left open in a tab shouldn't be payable long after the
  // offer ends. Stripe only accepts an expiry 30 minutes to 24 hours out, so
  // clamp the offer's end into that range.
  const nowSec = Math.floor(Date.now() / 1000);
  const expiresAt = offer
    ? Math.min(
        Math.max(Math.floor(new Date(offer.endsAt).getTime() / 1000), nowSec + 31 * 60),
        nowSec + 23 * 3600
      )
    : undefined;

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const checkout = await getStripe().checkout.sessions.create({
    // No payment_method_types: pinning it to ["card"] suppressed Apple Pay and
    // Google Pay. Letting Stripe pick automatically surfaces the wallets, which
    // matters because nearly all our traffic is mobile.
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: offer
              ? `Text to Emo — ${packInfo.label} (${offer.percent}% first-song discount)`
              : `Text to Emo — ${packInfo.label}`,
            description:
              packInfo.credits === 1
                ? "1 credit to unlock a full song on Text to Emo"
                : `${packInfo.credits} credits to unlock full songs on Text to Emo`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    ...(expiresAt ? { expires_at: expiresAt } : {}),
    success_url: `${origin}/?credits_session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    customer_email: session.user.email,
    custom_text: {
      after_submit: {
        message: "Questions or need help? Email support at sahil@texttoemo.com",
      },
    },
    metadata: {
      type: "credits",
      pack,
      credits: String(packInfo.credits),
      userEmail: session.user.email,
      ...(offer ? { discount: offer.id } : {}),
    },
  });

  return NextResponse.json({ url: checkout.url });
}
