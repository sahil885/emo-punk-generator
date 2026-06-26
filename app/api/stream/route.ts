import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getFinishedSunoTrack } from "@/lib/suno";

const PREVIEW_SECONDS = 40;
const PREVIEW_FALLBACK_BYTES = 1_100_000; // ~40s at ~190kbps when duration unknown

async function resolveByTask(taskId: string): Promise<string | null> {
  const rows = await sql`
    SELECT audio_url FROM songs WHERE task_id = ${taskId} AND audio_url IS NOT NULL LIMIT 1
  `;
  const fromDb = (rows[0] as { audio_url: string } | undefined)?.audio_url;
  if (fromDb) return fromDb;
  const track = await getFinishedSunoTrack(taskId);
  return track?.audioUrl ?? null;
}

// Streams a ~40s clip: fetches the total size, then returns only the leading
// portion sized to roughly PREVIEW_SECONDS of audio.
async function previewResponse(
  audioUrl: string,
  duration: number | null
): Promise<NextResponse> {
  let total: number | null = null;
  try {
    const probe = await fetch(audioUrl, { headers: { Range: "bytes=0-0" } });
    const cr = probe.headers.get("content-range"); // "bytes 0-0/12345"
    if (cr) {
      const m = cr.match(/\/(\d+)$/);
      if (m) total = parseInt(m[1], 10);
    }
  } catch {
    /* fall through to fallback sizing */
  }

  let previewBytes = PREVIEW_FALLBACK_BYTES;
  if (total) {
    previewBytes =
      duration && duration > 0
        ? Math.min(total, Math.ceil((total * PREVIEW_SECONDS) / duration))
        : Math.min(total, PREVIEW_FALLBACK_BYTES);
  }

  const upstream = await fetch(audioUrl, {
    headers: { Range: `bytes=0-${previewBytes - 1}` },
  });
  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  // Serve as a plain, non-seekable 200 clip — no Accept-Ranges, so the browser
  // can't request the rest of the file.
  const headers = new Headers();
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Content-Disposition", "inline");
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Preview", "true");
  return new NextResponse(upstream.body, { status: 200, headers });
}

async function fullResponse(audioUrl: string, range: string | null): Promise<NextResponse> {
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

// Playback proxy. Locked songs stream a ~40s preview; unlocked songs (the owner
// spent a credit) stream in full. The raw Suno URL is never exposed.
export async function GET(req: NextRequest) {
  const songId = req.nextUrl.searchParams.get("songId");
  const taskId = req.nextUrl.searchParams.get("taskId");

  let audioUrl: string | null = null;
  let unlocked = false;
  let duration: number | null = null;

  if (songId) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const rows = await sql`
      SELECT s.audio_url, s.task_id, s.unlocked, s.duration FROM songs s
      JOIN users u ON u.id = s."userId"
      WHERE s.id = ${songId} AND u.email = ${email}
    `;
    const row = rows[0] as
      | { audio_url: string | null; task_id: string | null; unlocked: boolean; duration: number | null }
      | undefined;
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    unlocked = row.unlocked;
    duration = row.duration;
    audioUrl = row.audio_url ?? (row.task_id ? await resolveByTask(row.task_id) : null);
  } else if (taskId) {
    // Pre-save / fallback path — always treated as a locked preview.
    audioUrl = await resolveByTask(taskId);
  } else {
    return NextResponse.json({ error: "Missing songId or taskId" }, { status: 400 });
  }

  if (!audioUrl) {
    return NextResponse.json({ error: "Audio not available" }, { status: 404 });
  }

  if (unlocked) {
    return fullResponse(audioUrl, req.headers.get("range"));
  }
  return previewResponse(audioUrl, duration);
}
