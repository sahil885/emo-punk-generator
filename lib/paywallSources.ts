// Where the credit-pack screen was opened from. Kept apart from
// lib/paywallEvents.ts (which imports the database) so the browser bundle can
// use the type without pulling in the DB client.
export const MODAL_SOURCES = [
  "player", // unlock pressed under a freshly generated song
  "library", // unlock pressed in My Songs
  "header", // the "+ Buy credits" button
  "offer_banner", // the 20%-off first-song offer
  "pricing_link", // arrived from /pricing with ?pack=
] as const;
export type ModalSource = (typeof MODAL_SOURCES)[number];

export function isModalSource(v: unknown): v is ModalSource {
  return typeof v === "string" && (MODAL_SOURCES as readonly string[]).includes(v);
}
