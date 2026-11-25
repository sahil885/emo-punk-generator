import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { callbackSignature, finishSongTask } from "@/lib/songReady";

// Suno calls this when a generation task moves on (it sends several callbacks
// per task: "text", "first", "complete"). The body is never trusted —
// finishSongTask re-checks the task with Suno before saving anything — and the
// URL carries a signature so stray POSTs are dropped without a Suno call.
//
// Copying the MP3 into storage happens in this request.
export const maxDuration = 60;

function validSig(sig: string | null): boolean {
  const expected = Buffer.from(callbackSignature());
  const given = Buffer.from(sig ?? "");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(req: NextRequest) {
  if (!validSig(req.nextUrl.searchParams.get("sig"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const data = body?.data;
  const taskId: unknown = data?.task_id ?? data?.taskId;
  if (typeof taskId !== "string" || !taskId) {
    return NextResponse.json({ ok: true, ignored: "no task id" });
  }
  // Lyrics-only and first-track callbacks arrive before the song is done.
  if (data?.callbackType && data.callbackType !== "complete") {
    return NextResponse.json({ ok: true, ignored: data.callbackType });
  }

  try {
    const result = await finishSongTask(taskId);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("suno callback failed", taskId, err);
    // Still 200: a retry storm from Suno won't help, and the daily sweep
    // picks up anything left unsaved.
    return NextResponse.json({ ok: false });
  }
}
