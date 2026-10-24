import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { deleteStoredAudio, isStoredUrl } from "@/lib/audioStorage";
import { PREVIEW_RETENTION_DAYS } from "@/lib/retention";

// Deletes the audio for previews nobody unlocked, once they're past the
// retention window. Songs that were unlocked are never touched — paying a
// credit is what buys a song that stays.
//
// Storing every preview forever is the cost that grows fastest: at ~60 songs a
// month and 4.8MB each, keeping the unlocked half roughly halves the bill.
//
// Run daily by Vercel Cron (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET`; without that secret set, the route
// refuses to run rather than exposing a delete endpoint to the internet.
export const maxDuration = 60;

const BATCH = 50;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not set" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const due = await sql`
    SELECT id, audio_url
    FROM songs
    WHERE unlocked = false
      AND audio_url IS NOT NULL
      AND created_at < NOW() - (${PREVIEW_RETENTION_DAYS} || ' days')::interval
    ORDER BY created_at ASC
    LIMIT ${BATCH}
  `;

  let deleted = 0;
  let skipped = 0;
  for (const row of due as { id: string; audio_url: string }[]) {
    // Only our own files can be deleted; legacy generator URLs expire on their
    // own and there's nothing of ours to remove.
    if (!isStoredUrl(row.audio_url)) {
      skipped++;
      continue;
    }
    if (await deleteStoredAudio(row.audio_url)) deleted++;
    else skipped++;
  }

  // audio_url is deliberately left in place: lib/retention already reports a
  // stored, locked, over-window song as expired, so the UI hides playback and
  // the unlock guard refuses to charge for it. Nulling it would make the row
  // look like audio that never finished.
  return NextResponse.json({
    ok: true,
    considered: due.length,
    deleted,
    skipped,
    retentionDays: PREVIEW_RETENTION_DAYS,
  });
}
