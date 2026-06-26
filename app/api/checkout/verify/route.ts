import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Confirms the $2.99 download payment. Does NOT return the audio URL — the
// client downloads the file through the gated /api/download?session_id=... route
// so the raw URL is never exposed.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
  }

  const { taskId, songTitle } = (session.metadata ?? {}) as {
    taskId?: string;
    songTitle?: string;
  };

  return NextResponse.json({
    ok: true,
    songTitle: songTitle ?? "emo-punk-song",
    taskId: taskId ?? null,
  });
}
