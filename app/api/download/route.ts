import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { getFinishedSunoTrack } from "@/lib/suno";

async function resolveByTask(taskId: string): Promise<string | null> {
  const rows = await sql`
    SELECT audio_url FROM songs WHERE task_id = ${taskId} AND audio_url IS NOT NULL LIMIT 1
  `;
  const fromDb = (rows[0] as { audio_url: string } | undefined)?.audio_url;
  if (fromDb) return fromDb;
  const track = await getFinishedSunoTrack(taskId);
  return track?.audioUrl ?? null;
}

// Gated MP3 download. Access requires EITHER a paid Stripe session for the song
// (anonymous $2.99 purchase) OR ownership of a saved library song (already paid
// for with a credit / purchase). The raw audio URL is never accepted from the
// client, so the old open-proxy bypass is closed.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const songId = req.nextUrl.searchParams.get("songId");

  let audioUrl: string | null = null;
  let title = "emo-punk-song";

  try {
    if (songId) {
      const session = await auth();
      const email = session?.user?.email;
      if (!email) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
      }
      const rows = await sql`
        SELECT s.title, s.audio_url, s.task_id FROM songs s
        JOIN users u ON u.id = s."userId"
        WHERE s.id = ${songId} AND u.email = ${email}
      `;
      const row = rows[0] as
        | { title: string; audio_url: string | null; task_id: string | null }
        | undefined;
      if (!row) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      title = row.title ?? title;
      audioUrl = row.audio_url ?? (row.task_id ? await resolveByTask(row.task_id) : null);
    } else if (sessionId) {
      const checkout = await getStripe().checkout.sessions.retrieve(sessionId);
      if (checkout.payment_status !== "paid") {
        return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
      }
      const taskId = checkout.metadata?.taskId;
      title = checkout.metadata?.songTitle ?? title;
      if (!taskId) {
        return NextResponse.json({ error: "Invalid session" }, { status: 400 });
      }
      audioUrl = await resolveByTask(taskId);
    } else {
      return NextResponse.json({ error: "Payment or sign-in required" }, { status: 402 });
    }
  } catch (err) {
    console.error("Download authorization error:", err);
    return NextResponse.json({ error: "Could not authorize download" }, { status: 500 });
  }

  if (!audioUrl) {
    return NextResponse.json({ error: "Audio not available" }, { status: 404 });
  }

  const audioRes = await fetch(audioUrl);
  if (!audioRes.ok) {
    return NextResponse.json({ error: "Failed to fetch audio" }, { status: 502 });
  }

  const safeTitle = title.replace(/[/\\?%*:|"<>]/g, "").trim() || "emo-punk-song";

  return new NextResponse(audioRes.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${safeTitle}.mp3"`,
      ...(audioRes.headers.get("content-length")
        ? { "Content-Length": audioRes.headers.get("content-length")! }
        : {}),
    },
  });
}
