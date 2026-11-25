import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { finishSongTask } from "@/lib/songReady";

// Backstop for /api/audio/callback: saves songs that finished at Suno but never
// reached us (a missed callback, or anything made before the callback existed).
// Suno deletes its files after ~2 weeks, so this is the last chance to keep
// them. Emails only go out for recent songs — see EMAIL_MAX_AGE_HOURS.
//
// Run daily by Vercel Cron (see vercel.json), authenticated like
// purge-previews with `Authorization: Bearer $CRON_SECRET`.
export const maxDuration = 60;

// A finished song means a ~5MB copy into storage (a few seconds); a failed
// generation is just one cheap Suno check, and those stay "pending" for good,
// so the batch has room for both inside the 60s budget.
const BATCH = 12;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not set" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Older than 10 minutes so it never races a generation still in progress;
  // younger than 14 days because Suno has deleted anything older.
  const pending = await sql`
    SELECT task_id FROM songs
    WHERE task_id IS NOT NULL
      AND audio_url IS NULL
      AND created_at < now() - interval '10 minutes'
      AND created_at > now() - interval '14 days'
    ORDER BY created_at DESC
    LIMIT ${BATCH}
  `;

  const results: Record<string, number> = {};
  for (const row of pending as { task_id: string }[]) {
    try {
      const r = await finishSongTask(row.task_id);
      results[r] = (results[r] ?? 0) + 1;
    } catch (err) {
      console.error("finish-songs: failed", row.task_id, err);
      results.error = (results.error ?? 0) + 1;
    }
  }

  return NextResponse.json({ checked: pending.length, results });
}
