import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const SUNO_BASE = "https://api.sunoapi.org";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  // Verify the Stripe payment
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
  }

  const { taskId, songTitle } = session.metadata as {
    taskId: string;
    songTitle: string;
  };

  // Fetch the audio URL from Suno
  const sunoRes = await fetch(
    `${SUNO_BASE}/api/v1/generate/record-info?taskId=${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
      },
    }
  );

  const sunoData = await sunoRes.json();

  if (sunoData.code !== 200 || sunoData.data?.status !== "SUCCESS") {
    return NextResponse.json({ error: "Audio not ready" }, { status: 503 });
  }

  const track = sunoData.data.response?.sunoData?.[0];
  const audioUrl = track?.audioUrl ?? track?.streamAudioUrl ?? null;

  if (!audioUrl) {
    return NextResponse.json({ error: "Audio URL not found" }, { status: 404 });
  }

  return NextResponse.json({ audioUrl, songTitle, taskId });
}
