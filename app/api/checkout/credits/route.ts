import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";

const PACKS = {
  "3pack": { credits: 3, amount: 749, label: "3 Songs Pack" },
  "10pack": { credits: 10, amount: 1999, label: "10 Songs Pack" },
} as const;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in to buy credits" }, { status: 401 });
  }

  const { pack } = await req.json() as { pack: keyof typeof PACKS };
  const packInfo = PACKS[pack];
  if (!packInfo) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const checkout = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `EMO PUNK AI — ${packInfo.label}`,
            description: `${packInfo.credits} song generations for EMO PUNK AI`,
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
    metadata: {
      type: "credits",
      pack,
      credits: String(packInfo.credits),
      userEmail: session.user.email,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
