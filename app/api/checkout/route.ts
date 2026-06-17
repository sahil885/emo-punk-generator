import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { taskId, songTitle } = await req.json();

  if (!taskId) {
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `"${songTitle}" — Emo Punk AI Song`,
            description: "Download your AI-generated emo pop punk song as an MP3",
          },
          unit_amount: 299, // $2.99
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    metadata: { taskId, songTitle },
  });

  return NextResponse.json({ url: session.url });
}
