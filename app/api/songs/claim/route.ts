import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getFinishedSunoTrack } from "@/lib/suno";

// Saves a song generated before the user signed in to their account.
export async function POST(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { title, lyrics, singer, taskId } = await req.json();
  if (!title || !lyrics) {
    return NextResponse.json({ error: "Missing song data" }, { status: 400 });
  }

  const users = await sql`SELECT id FROM users WHERE email = ${userEmail}`;
  const userId = (users[0] as { id: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Idempotent: if this song (by Suno task) was already claimed, return it
  if (taskId) {
    const existing = await sql`
      SELECT id FROM songs WHERE "userId" = ${userId} AND task_id = ${taskId}
    `;
    if (existing.length > 0) {
      return NextResponse.json({ songId: (existing[0] as { id: string }).id, claimed: false });
    }
  }

  // Attach audio right away if the Suno task already finished
  const track = taskId ? await getFinishedSunoTrack(taskId) : null;

  const inserted = await sql`
    INSERT INTO songs ("userId", title, lyrics, singer, task_id, audio_url, image_url, duration)
    VALUES (
      ${userId},
      ${String(title).slice(0, 200)},
      ${String(lyrics).slice(0, 10000)},
      ${singer === "female" ? "female" : "male"},
      ${taskId ?? null},
      ${track?.audioUrl ?? null},
      ${track?.imageUrl ?? null},
      ${track?.duration ?? null}
    )
    RETURNING id
  `;

  return NextResponse.json({ songId: (inserted[0] as { id: string }).id, claimed: true });
}
