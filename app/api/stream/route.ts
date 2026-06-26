import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getFinishedSunoTrack } from "@/lib/suno";

// Resolve the real audio URL for a Suno task without ever exposing it to the
// client — prefer the value already saved in the DB, fall back to Suno.
async function resolveByTask(taskId: string): Promise<string | null> {
  const rows = await sql`
    SELECT audio_url FROM songs WHERE task_id = ${taskId} AND audio_url IS NOT NULL LIMIT 1
  `;
  const fromDb = (rows[0] as { audio_url: string } | undefined)?.audio_url;
  if (fromDb) return fromDb;
  const track = await getFinishedSunoTrack(taskId);
  return track?.audioUrl ?? null;
}

// Playback proxy. Streams audio bytes through our own origin so the underlying
// Suno URL is never handed to the browser. Used as the <audio> source.
export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  const songId = req.nextUrl.searchParams.get("songId");

  let audioUrl: string | null = null;

  if (songId) {
    // A saved library song — must belong to the signed-in user.
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const rows = await sql`
      SELECT s.audio_url, s.task_id FROM songs s
      JOIN users u ON u.id = s."userId"
      WHERE s.id = ${songId} AND u.email = ${email}
    `;
    const row = rows[0] as { audio_url: string | null; task_id: string | null } | undefined;
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    audioUrl = row.audio_url ?? (row.task_id ? await resolveByTask(row.task_id) : null);
  } else if (taskId) {
    audioUrl = await resolveByTask(taskId);
  } else {
    return NextResponse.json({ error: "Missing taskId or songId" }, { status: 400 });
  }

  if (!audioUrl) {
    return NextResponse.json({ error: "Audio not available" }, { status: 404 });
  }

  // Forward Range so the browser can seek within the track.
  const range = req.headers.get("range");
  const upstream = await fetch(audioUrl, range ? { headers: { Range: range } } : {});
  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Content-Disposition", "inline");
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "private, no-store");
  for (const h of ["content-length", "content-range"]) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }

  return new NextResponse(upstream.body, { status: upstream.status, headers });
}
