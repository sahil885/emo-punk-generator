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
