import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { attachSongAudio } from "@/lib/songAudio";

const SUNO_BASE = "https://api.sunoapi.org";
const SUNO_KEY = process.env.SUNO_API_KEY!;

// Copying a ~5MB MP3 into our storage happens inside this request, so it needs
// more than the default execution budget.
export const maxDuration = 60;

const TERMINAL_STATUSES = new Set([
  "SUCCESS",
  "CREATE_TASK_FAILED",
  "GENERATE_AUDIO_FAILED",
  "CALLBACK_EXCEPTION",
  "SENSITIVE_WORD_ERROR",
]);

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) {
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
  }

  // "Someone is on the page." lib/songReady.ts only emails a song's owner if
  // this stamp has gone stale by the time the song finishes. Best-effort: a
  // failure here must never break the poll itself.
  try {
    await sql`UPDATE songs SET last_polled_at = now() WHERE task_id = ${taskId}`;
  } catch (err) {
    console.error("last_polled_at stamp failed", err);
  }

  const res = await fetch(
    `${SUNO_BASE}/api/v1/generate/record-info?taskId=${taskId}`,
    {
      headers: { Authorization: `Bearer ${SUNO_KEY}` },
    }
  );

  const data = await res.json();

  if (!res.ok || data.code !== 200) {
    return NextResponse.json(
      { error: data.msg || "Status check failed" },
      { status: 500 }
    );
  }

  const { status, response } = data.data;
  const done = TERMINAL_STATUSES.has(status);
  const failed = status !== "SUCCESS" && done;

  let audioUrl: string | null = null;
  let imageUrl: string | null = null;
  let duration: number | null = null;

  if (status === "SUCCESS" && response?.sunoData?.length > 0) {
    const track = response.sunoData[0];
    audioUrl = track.audioUrl ?? track.streamAudioUrl ?? null;
    imageUrl = track.imageUrl ?? null;
    duration = track.duration ?? null;

    // Attach the finished audio to the saved song linked to this task.
    // Data comes from Suno (not the client), so no auth needed here. Only
    // songs with no audio yet are processed, so repeated polls don't re-copy.
    if (audioUrl) {
      await attachSongAudio(taskId, { audioUrl, imageUrl, duration });
    }
  }

  // NOTE: we deliberately do NOT return the raw Suno audioUrl to the client —
  // exposing it lets anyone download the track for free. The client plays via
  // the /api/stream proxy and downloads via the payment-gated /api/download.
  return NextResponse.json({
    status,
    done,
    failed,
    hasAudio: !!audioUrl,
    imageUrl,
    duration,
  });
}
