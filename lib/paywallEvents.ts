import { sql } from "@/lib/db";
import { isModalSource, type ModalSource } from "@/lib/paywallSources";

export { isModalSource };

// First-party counter for the paywall.
//
// Stripe showed no checkout opened by any real user between 21 July and
// 3 Nov 2026, but nothing recorded whether people even saw a price — so "no
// sales" couldn't be split into "never reached the buy screen" vs "saw the
// prices and left". These events answer that:
//
//   unlock_no_credits  server  tried to unlock a song with no credits left
//   buy_modal_open     client  the credit-pack screen was shown (with source)
//   checkout_started   server  clicked Continue and a Stripe session was made
//
// Completed purchases are already in the purchases table.
//
// Recording must never break the request it's attached to, so every failure
// is swallowed and logged.

export type PaywallEvent = "unlock_no_credits" | "buy_modal_open" | "checkout_started";

export async function recordPaywallEvent(input: {
  email: string;
  event: PaywallEvent;
  source?: ModalSource;
  pack?: string;
  songId?: string;
}): Promise<void> {
  try {
    await sql`
      INSERT INTO paywall_events ("userId", event, source, pack, song_id)
      SELECT id, ${input.event}, ${input.source ?? null}, ${input.pack ?? null}, ${input.songId ?? null}
      FROM users WHERE email = ${input.email}
    `;
  } catch (err) {
    console.error("paywall event not recorded:", input.event, err);
  }
}
