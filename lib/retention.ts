// How long a generated track stays playable.
//
// Until Oct 2026 every song pointed at the generator's temporary CDN, which
// deletes files after roughly two weeks, so everything expired — including
// songs people had paid a credit to unlock. We now copy each finished MP3 into
// our own storage (lib/audioStorage.ts), which changes the rules:
//
//   • unlocked + ours  → kept indefinitely. Spending a credit buys a song that
//                        stays, which is the whole point of buying one.
//   • locked + ours    → a preview. Kept 30 days, then purged, because storing
//                        previews nobody unlocked is the cost that grows fastest.
//   • not ours         → a song from before the fix, still on the generator's
//                        CDN. Measured 2026-08-12: alive at 10.3 days, gone by
//                        19.2. We advertise 7 days for these, inside proven
//                        territory. Nothing can extend them; the file isn't ours.

/** Previews we host but nobody unlocked. */
export const PREVIEW_RETENTION_DAYS = 30;

/** Songs still on the generator's CDN, from before we stored our own copy. */
export const LEGACY_RETENTION_DAYS = 7;

const DAY_MS = 86_400_000;

export interface SongRetentionInput {
  createdAt: string | Date;
  unlocked: boolean;
  /** True when the audio lives in our storage rather than the generator's CDN. */
  stored: boolean;
}

export interface SongRetention {
  /** Kept with no deadline. */
  permanent: boolean;
  /** Whole days left; 0 when the window has passed. Meaningless if permanent. */
  daysLeft: number;
  expired: boolean;
  /** Short label for the library row. */
  label: string;
}

function windowDays({ unlocked, stored }: SongRetentionInput): number | null {
  if (stored && unlocked) return null; // no deadline
  return stored ? PREVIEW_RETENTION_DAYS : LEGACY_RETENTION_DAYS;
}

export function songRetention(input: SongRetentionInput): SongRetention {
  const days = windowDays(input);

  if (days === null) {
    return {
      permanent: true,
      daysLeft: Infinity,
      expired: false,
      label: "Saved to your library",
    };
  }

  const endsAt = new Date(input.createdAt).getTime() + days * DAY_MS;
  const ms = endsAt - Date.now();
  const daysLeft = ms <= 0 ? 0 : Math.ceil(ms / DAY_MS);

  if (daysLeft === 0) {
    return {
      permanent: false,
      daysLeft: 0,
      expired: true,
      label: input.stored ? "Preview expired" : "Audio no longer available",
    };
  }

  // An already-unlocked legacy song can't be "kept" by unlocking it again —
  // the only thing left to do is download the file before it goes.
  const action = input.unlocked ? "to download it" : "— unlock to keep it";
  return {
    permanent: false,
    daysLeft,
    expired: false,
    label:
      daysLeft === 1
        ? `Last day ${action}`
        : `${daysLeft} days left ${action}`,
  };
}

/** Convenience for callers that only need the yes/no. */
export function isSongExpired(input: SongRetentionInput): boolean {
  return songRetention(input).expired;
}
