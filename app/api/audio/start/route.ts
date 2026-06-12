import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

const SUNO_BASE = "https://api.sunoapi.org";
const SUNO_KEY = process.env.SUNO_API_KEY!;

export async function POST(req: NextRequest) {
  const { title, lyrics, singer, songId } = await req.json();

  if (!lyrics) {
    return NextResponse.json({ error: "No lyrics provided" }, { status: 400 });
  }

  const style =
    "emo pop punk, electric guitar, power chords, drums, bass, emotional, anthemic, angsty, 2000s punk, raw vocals";

  const res = await fetch(`${SUNO_BASE}/api/v1/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUNO_KEY}`,
    },
    body: JSON.stringify({
      customMode: true,
      instrumental: false,
      model: "V4_5",
      title: title.slice(0, 80),
      prompt: lyrics,
      style,
      vocalGender: singer === "female" ? "f" : "m",
      callBackUrl: "https://example.com/noop",
    }),
  });

  const data = await res.json();

  if (!res.ok || data.code !== 200) {
    console.error("Suno generate error:", data);
    return NextResponse.json(
      { error: data.msg || "Suno generation failed" },
      { status: 500 }
    );
  }

  const taskId: string = data.data.taskId;

  // Link the Suno task to the user's saved song so the audio URL can be
  // attached once generation completes
  if (songId) {
    const session = await auth();
    const userEmail = session?.user?.email;
    if (userEmail) {
      await sql`
        UPDATE songs SET task_id = ${taskId}
        WHERE id = ${songId}
          AND "userId" = (SELECT id FROM users WHERE email = ${userEmail})
      `;
    }
  }

  return NextResponse.json({ taskId });
}
