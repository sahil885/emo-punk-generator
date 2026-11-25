import { sql } from "@/lib/db";

const SUNO_BASE = "https://api.sunoapi.org";

export interface SunoTrack {
  audioUrl: string | null;
  imageUrl: string | null;
  duration: number | null;
}

// Returns track info if the task finished successfully, null otherwise
export async function getFinishedSunoTrack(taskId: string): Promise<SunoTrack | null> {
  try {
    const res = await fetch(
      `${SUNO_BASE}/api/v1/generate/record-info?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${process.env.SUNO_API_KEY}` } }
    );
    const data = await res.json();
    if (!res.ok || data.code !== 200) return null;

    const { status, response } = data.data;
    if (status !== "SUCCESS" || !response?.sunoData?.length) return null;

    const track = response.sunoData[0];
    return {
      audioUrl: track.audioUrl ?? track.streamAudioUrl ?? null,
      imageUrl: track.imageUrl ?? null,
      duration: track.duration != null ? Math.round(track.duration) : null,
    };
  } catch {
    return null;
  }
}

const STYLE =
  "emo pop punk, electric guitar, power chords, drums, bass, emotional, anthemic, angsty, 2000s punk, raw vocals";

// Start audio generation for a saved song and record the task on it. Returns
// the task id, or null if Suno refused. Called by /api/generate as soon as the
// lyrics are saved, so the music starts even if the visitor closes the tab.
export async function startSunoForSong(input: {
  songId: string;
  title: string;
  lyrics: string;
  singer: string;
  callbackUrl: string;
}): Promise<string | null> {
  try {
    const res = await fetch(`${SUNO_BASE}/api/v1/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
      },
      body: JSON.stringify({
        customMode: true,
        instrumental: false,
        model: "V4_5",
        title: input.title.slice(0, 80),
        prompt: input.lyrics,
        style: STYLE,
        vocalGender: input.singer === "female" ? "f" : "m",
        callBackUrl: input.callbackUrl,
      }),
    });
    const data = await res.json();
    if (!res.ok || data.code !== 200 || !data.data?.taskId) {
      console.error("Suno generate error:", data);
      return null;
    }
    const taskId: string = data.data.taskId;
    await sql`UPDATE songs SET task_id = ${taskId} WHERE id = ${input.songId}`;
    return taskId;
  } catch (err) {
    console.error("Suno generate failed", err);
    return null;
  }
}
