import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getFinishedSunoTrack } from "@/lib/suno";

export async function GET() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  // Backfill audio for songs whose tab was closed before Suno finished
  // (normally the browser's polling attaches the audio URL)
  const pending = await sql`
    SELECT s.id, s.task_id
    FROM songs s
    JOIN users u ON u.id = s."userId"
    WHERE u.email = ${userEmail} AND s.task_id IS NOT NULL AND s.audio_url IS NULL
    LIMIT 5
  `;
  for (const row of pending as { id: string; task_id: string }[]) {
    const track = await getFinishedSunoTrack(row.task_id);
    if (track?.audioUrl) {
      await sql`
        UPDATE songs
        SET audio_url = ${track.audioUrl}, image_url = ${track.imageUrl}, duration = ${track.duration}
        WHERE id = ${row.id} AND audio_url IS NULL
      `;
    }
  }

  const songs = await sql`
    SELECT s.id, s.title, s.lyrics, s.singer,
           (s.audio_url IS NOT NULL) AS "hasAudio",
           s.unlocked,
           s.image_url, s.duration, s.created_at
    FROM songs s
    JOIN users u ON u.id = s."userId"
    WHERE u.email = ${userEmail}
    ORDER BY s.created_at DESC
  `;

  return NextResponse.json({ songs });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await sql`
    DELETE FROM songs
    WHERE id = ${id}
      AND "userId" = (SELECT id FROM users WHERE email = ${userEmail})
  `;

  return NextResponse.json({ ok: true });
}
