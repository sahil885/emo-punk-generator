import { sql } from "@/lib/db";
import { storeSongAudio } from "@/lib/audioStorage";
import type { SunoTrack } from "@/lib/suno";

// Attach a finished Suno track to the saved song for that task. Shared by the
// browser's status poll, the library backfill, the Suno callback and the daily
// sweep, so whichever notices first does the work and the rest are no-ops.
//
// Copies the MP3 into our own storage first: Suno's CDN deletes files after
// ~2 weeks, and storing its URL is what made every song eventually 404. Falls
// back to the source URL if storage is down — a song that plays for two weeks
// beats one that never plays.
//
// Returns true if this call attached the audio, false if it was already there.
export async function attachSongAudio(taskId: string, track: SunoTrack): Promise<boolean> {
  if (!track.audioUrl) return false;

  const rows = await sql`SELECT id, audio_url FROM songs WHERE task_id = ${taskId} LIMIT 1`;
  const song = rows[0] as { id: string; audio_url: string | null } | undefined;
  if (song?.audio_url) return false;

  const stored = await storeSongAudio(song?.id ?? `task-${taskId}`, track.audioUrl);
  const updated = await sql`
    UPDATE songs
    SET audio_url = ${stored?.url ?? track.audioUrl},
        image_url = ${track.imageUrl},
        duration = ${track.duration === null ? null : Math.round(track.duration)}
    WHERE task_id = ${taskId} AND audio_url IS NULL
    RETURNING id
  `;
  return updated.length > 0;
}
