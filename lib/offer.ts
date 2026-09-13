import { sql } from "@/lib/db";
import { FIRST_SONG_OFFER, offerEndsAt } from "@/lib/pricing";

export interface ActiveOffer {
  id: string;
  percent: number;
  /** ISO timestamp the offer disappears at. */
  endsAt: string;
}

// The first-song discount is live when the user made their first song less than
// 24 hours ago and hasn't bought anything yet — so it can be used exactly once,
// and once the window passes it's gone for good.
//
// Anchored on users.first_song_at, which is written once and never overwritten,
// rather than the oldest row in songs: songs are hard-deleted, so deleting
// everything and generating again must not reopen the window.
export async function getActiveOffer(email: string): Promise<ActiveOffer | null> {
  const rows = await sql`
    SELECT u.first_song_at,
           EXISTS (SELECT 1 FROM purchases p WHERE p."userId" = u.id) AS has_purchased
    FROM users u
    WHERE u.email = ${email}
  `;
  const row = rows[0] as
    | { first_song_at: string | Date | null; has_purchased: boolean }
    | undefined;
  if (!row?.first_song_at || row.has_purchased) return null;

  const endsAt = offerEndsAt(row.first_song_at);
  if (endsAt.getTime() <= Date.now()) return null;

  return {
    id: FIRST_SONG_OFFER.id,
    percent: FIRST_SONG_OFFER.percent,
    endsAt: endsAt.toISOString(),
  };
}
