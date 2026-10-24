import { put, del } from "@vercel/blob";

// Our own copy of each finished song.
//
// Suno returns audio on a temporary CDN (tempfile.aiquickdraw.com) that deletes
// files after roughly two weeks. We were storing that URL as if it were
// permanent, so every song eventually 404'd — including 94 that users had spent
// credits to unlock. This copies the MP3 to our Blob store the moment it's
// ready and stores that URL instead.
//
// Blob URLs are never sent to the browser: /api/stream and /api/download fetch
// them server-side and proxy the bytes, which is the same arrangement that
// gated the Suno URLs, so the paywall is unchanged.

/** Fails closed: callers fall back to the source URL rather than losing a song. */
export interface StoredAudio {
  url: string;
  bytes: number;
}

export function audioStorageConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Stable path per song, so a retry overwrites rather than duplicating. */
export function audioPath(songId: string): string {
  return `songs/${songId}.mp3`;
}

/**
 * Copy a finished track into our storage.
 *
 * Returns null on any failure — a missing token, an expired source, a blob
 * error. The caller keeps the source URL in that case: a song that plays for
 * two weeks beats a song that never plays at all.
 */
export async function storeSongAudio(
  songId: string,
  sourceUrl: string
): Promise<StoredAudio | null> {
  if (!audioStorageConfigured()) return null;

  try {
    const res = await fetch(sourceUrl);
    if (!res.ok || !res.body) {
      console.error(`audioStorage: source fetch failed ${res.status} for ${songId}`);
      return null;
    }

    const blob = await put(audioPath(songId), res.body, {
      access: "public",
      contentType: "audio/mpeg",
      // Deterministic path: re-running for the same song replaces the file
      // instead of piling up copies with random suffixes.
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    const bytes = Number(res.headers.get("content-length") ?? 0);
    return { url: blob.url, bytes };
  } catch (err) {
    console.error(`audioStorage: store failed for ${songId}`, err);
    return null;
  }
}

/** True when a URL points at our own storage rather than the generator's CDN. */
export function isStoredUrl(url: string | null | undefined): boolean {
  return !!url && /\.public\.blob\.vercel-storage\.com\//.test(url);
}

/** Delete a stored file. Used by the preview purge; never throws. */
export async function deleteStoredAudio(url: string): Promise<boolean> {
  if (!audioStorageConfigured() || !isStoredUrl(url)) return false;
  try {
    await del(url);
    return true;
  } catch (err) {
    console.error("audioStorage: delete failed", err);
    return false;
  }
}
