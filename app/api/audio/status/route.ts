import { NextRequest, NextResponse } from "next/server";

const SUNO_BASE = "https://api.sunoapi.org";
const SUNO_KEY = process.env.SUNO_API_KEY!;

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
  }

  return NextResponse.json({ status, done, failed, audioUrl, imageUrl, duration });
}
