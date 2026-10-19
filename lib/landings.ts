// The commercial landing pages, in one list so the sitemap and the internal
// links between them can't drift from what actually exists.
//
// Oct 2026: the three newest generator pages had 1–2 inbound internal links
// each, because the "More generators" and "Make one now" blocks were both
// showing a truncated slice of this list. Both now render GENERATOR_PAGES in
// full, minus the page you're on.

export interface Landing {
  path: string;
  /** Short label used in internal link lists. */
  label: string;
  /** Sitemap priority — commercial pages sit above the blog. */
  priority: number;
}

/** The eight "… generator" pages that cross-link to each other. */
export const GENERATOR_PAGES: Landing[] = [
  { path: "/emo-song-generator", label: "Emo song generator", priority: 0.9 },
  { path: "/emo-lyrics-generator", label: "Emo lyrics generator", priority: 0.9 },
  { path: "/punk-lyrics-generator", label: "Punk lyrics generator", priority: 0.9 },
  {
    path: "/emo-song-title-generator",
    label: "Emo song title generator",
    priority: 0.9,
  },
  { path: "/emo-poetry-generator", label: "Emo poetry generator", priority: 0.9 },
  {
    path: "/midwest-emo-lyrics-generator",
    label: "Midwest emo lyrics generator",
    priority: 0.9,
  },
  {
    path: "/emo-rap-lyrics-generator",
    label: "Emo rap lyrics generator",
    priority: 0.9,
  },
  { path: "/diss-track-generator", label: "Diss track generator", priority: 0.9 },
];

/** Commercial pages that aren't part of the generator cross-link set. */
export const OTHER_LANDINGS: Landing[] = [
  { path: "/ai-song-generator", label: "AI song generator", priority: 0.9 },
  {
    path: "/free-ai-song-generator",
    label: "Free AI song generator",
    priority: 0.9,
  },
  {
    path: "/turn-texts-into-an-emo-song",
    label: "Turn texts into an emo song",
    priority: 0.9,
  },
  { path: "/personalized-song-gift", label: "Personalized song gift", priority: 0.9 },
];

export const ALL_LANDINGS: Landing[] = [...GENERATOR_PAGES, ...OTHER_LANDINGS];

/**
 * Every other generator page, for the "More generators" list. No slice: the
 * truncation is what starved midwest emo, emo rap and diss track of links.
 */
export function relatedGenerators(currentPath: string) {
  return GENERATOR_PAGES.filter((l) => l.path !== currentPath).map((l) => ({
    href: l.path,
    label: l.label,
  }));
}
