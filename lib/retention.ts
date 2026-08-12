// How long a generated track stays downloadable.
//
// Audio is hosted on the generator's temporary CDN, not ours, so files are
// removed after a while. Measured against production on 2026-08-12: tracks were
// still alive at 10.3 days and gone by 19.2 days, with no samples in between —
// so the real cutoff is somewhere in that range. We advertise 7 days, which is
// comfortably inside proven territory: better to under-promise than to tell
// someone they have longer than they do.
//
// Raise this only with evidence of the actual retention window.
export const AUDIO_RETENTION_DAYS = 7;

const DAY_MS = 86_400_000;

export function expiresAt(createdAt: string | Date): Date {
  return new Date(
    new Date(createdAt).getTime() + AUDIO_RETENTION_DAYS * DAY_MS
  );
}

/** Whole days left before the audio is removed; 0 once the window has passed. */
export function daysLeft(createdAt: string | Date): number {
  const ms = expiresAt(createdAt).getTime() - Date.now();
  return ms <= 0 ? 0 : Math.ceil(ms / DAY_MS);
}

export function isExpired(createdAt: string | Date): boolean {
  return daysLeft(createdAt) === 0;
}

/** Short label for the UI, e.g. "2 days left to download". */
export function retentionLabel(createdAt: string | Date): string {
  const d = daysLeft(createdAt);
  if (d === 0) return "Download window closed";
  if (d === 1) return "Last day to download";
  return `${d} days left to download`;
}
