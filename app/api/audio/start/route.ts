import { NextRequest, NextResponse, after } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { startSunoForSong } from "@/lib/suno";
import { sunoCallbackUrl, watchSongTask } from "@/lib/songReady";

// Long enough for after() to watch the song finish.
export const maxDuration = 300;

// Fallback only. /api/generate starts the music itself as soon as the lyrics
// are saved (so closing the tab can't stop it); the browser calls this only
// if that server-side start failed, or if it's an older copy of the page.
//
// It used to accept any lyrics from anyone and spend a Suno generation on
// them. Now it needs a signed-in owner and an existing song, and it never
// starts a second job for a song that already has one — an old page calling
// this after the server already started the song gets the existing task back.
export async function POST(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { songId } = await req.json().catch(() => ({}));
  if (typeof songId !== "string" || !songId) {
    return NextResponse.json({ error: "No song" }, { status: 400 });
  }

  const rows = await sql`
    SELECT s.id, s.title, s.lyrics, s.singer, s.task_id
    FROM songs s JOIN users u ON u.id = s."userId"
    WHERE s.id = ${songId} AND u.email = ${userEmail}
  `;
  const song = rows[0] as
    | { id: string; title: string; lyrics: string; singer: string; task_id: string | null }
    | undefined;
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  if (song.task_id) {
    return NextResponse.json({ taskId: song.task_id });
  }

  const taskId = await startSunoForSong({
    songId: song.id,
    title: song.title,
    lyrics: song.lyrics,
    singer: song.singer,
    callbackUrl: sunoCallbackUrl(),
  });
  if (!taskId) {
    return NextResponse.json({ error: "Suno generation failed" }, { status: 500 });
  }
  after(() => watchSongTask(taskId));
  return NextResponse.json({ taskId });
}
