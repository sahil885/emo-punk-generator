import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { PACKS, isPackId } from "@/lib/pricing";

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

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const checkout = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Text to Emo — ${packInfo.label}`,
            description:
              packInfo.credits === 1
                ? "1 credit to unlock a full song on Text to Emo"
                : `${packInfo.credits} credits to unlock full songs on Text to Emo`,
          },
          unit_amount: packInfo.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
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
    },
  });

  return NextResponse.json({ url: checkout.url });
}
