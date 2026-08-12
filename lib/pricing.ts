// Single source of truth for credit pricing.
//
// The checkout route (what Stripe actually charges), the in-app buy modal, and
// the public /pricing page all read from here, so a price change is a one-line
// edit that can't drift between what a customer is shown and what they're
// billed. Per-song and savings figures are derived rather than hardcoded for
// the same reason.
//
// Pack ids are persisted on Stripe sessions and in the purchases table — never
// rename an existing one, only add.

export type PackId = "1pack" | "3pack" | "10pack" | "25pack";

export interface Pack {
  id: PackId;
  credits: number;
  /** Charge in cents — the value handed to Stripe. */
  amount: number;
  /** Line-item name on the Stripe checkout page. */
  label: string;
  /** Display price, e.g. "$7.49". */
  price: string;
  badge: string | null;
  highlight: boolean;
  blurb: string;
}

export const PACKS: Record<PackId, Pack> = {
  "1pack": {
    id: "1pack",
    credits: 1,
    amount: 399,
    label: "1 Song",
    price: "$3.99",
    badge: null,
    highlight: false,
    blurb: "Unlock one full song — no commitment.",
  },
  "3pack": {
    id: "3pack",
    credits: 3,
    amount: 749,
    label: "3 Songs Pack",
    price: "$7.49",
    badge: null,
    highlight: false,
    blurb: "A few tracks to play with.",
  },
  "10pack": {
    id: "10pack",
    credits: 10,
    amount: 1999,
    label: "10 Songs Pack",
    price: "$19.99",
    badge: "Most popular",
    highlight: true,
    blurb: "The sweet spot for most people.",
  },
  "25pack": {
    id: "25pack",
    credits: 25,
    amount: 3999,
    // No badge: a second badge competes with "Most popular" and splits
    // attention. This tier sells on price-per-song, which is shown anyway.
    label: "25 Songs Pack",
    price: "$39.99",
    badge: null,
    highlight: false,
    blurb: "Cheapest per song — for the prolific.",
  },
};

/** Display order: cheapest entry point first, biggest pack last. */
export const PACK_LIST: Pack[] = [
  PACKS["1pack"],
  PACKS["3pack"],
  PACKS["10pack"],
  PACKS["25pack"],
];

// Own-property check, not `in`: `in` walks the prototype chain, so ids like
// "constructor" or "toString" would pass and reach Stripe as an undefined price.
export function isPackId(value: unknown): value is PackId {
  return typeof value === "string" && Object.hasOwn(PACKS, value);
}

/** Per-song price, e.g. "$1.60". */
export function perSong(pack: Pack): string {
  return `$${(pack.amount / pack.credits / 100).toFixed(2)}`;
}

/** Whole-percent saving vs. buying single songs. 0 for the single-song pack. */
export function savingsPct(pack: Pack): number {
  const singlePerSong = PACKS["1pack"].amount;
  return Math.round((1 - pack.amount / pack.credits / singlePerSong) * 100);
}
