import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { storeSongAudio } from "@/lib/audioStorage";

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
    // Data comes from Suno (not the client), so no auth needed here.
    if (audioUrl) {
      // Copy the MP3 into our own storage first and persist that URL. Suno's
      // CDN deletes files after ~2 weeks; storing its URL is what made every
      // song eventually 404. Only songs with no audio yet are processed, so
      // the repeated polling of this endpoint doesn't re-copy.
      const existing = await sql`
        SELECT id, audio_url FROM songs WHERE task_id = ${taskId} LIMIT 1
      `;
      const song = existing[0] as
        | { id: string; audio_url: string | null }
        | undefined;

      let urlToStore = audioUrl;
      if (!song?.audio_url) {
        const stored = await storeSongAudio(song?.id ?? `task-${taskId}`, audioUrl);
        // Falling back to the source URL keeps a song that plays for two weeks
        // rather than one that never plays, if storage is down or unconfigured.
        if (stored) urlToStore = stored.url;
      }

      await sql`
        UPDATE songs
        SET audio_url = ${urlToStore},
            image_url = ${imageUrl},
            duration = ${duration === null ? null : Math.round(duration)}
        WHERE task_id = ${taskId} AND audio_url IS NULL
      `;
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
