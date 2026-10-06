// The commercial landing pages, in one list so the sitemap and the internal
// links between them can't drift from what actually exists.
//
// The "generator" group came out of the Sept 2026 traffic audit: Search Console
// showed the domain ranking 65–87 for these terms with no page aimed at any of
// them, so Google was serving blog posts to people looking for a tool.

export interface Landing {
  path: string;
  /** Short label used in internal link lists. */
  label: string;
  /** Sitemap priority — commercial pages sit above the blog. */
  priority: number;
}

export const GENERATOR_LANDINGS: Landing[] = [
  { path: "/emo-song-generator", label: "Emo song generator", priority: 0.9 },
  { path: "/ai-song-generator", label: "AI song generator", priority: 0.9 },
  { path: "/emo-lyrics-generator", label: "Emo lyrics generator", priority: 0.9 },
  { path: "/punk-lyrics-generator", label: "Punk lyrics generator", priority: 0.9 },
  { path: "/emo-song-title-generator", label: "Emo song title generator", priority: 0.9 },
  { path: "/emo-poetry-generator", label: "Emo poetry generator", priority: 0.9 },
  {
    path: "/midwest-emo-lyrics-generator",
    label: "Midwest emo lyrics generator",
    priority: 0.9,
  },
  { path: "/emo-rap-lyrics-generator", label: "Emo rap lyrics generator", priority: 0.9 },
  { path: "/diss-track-generator", label: "Diss track generator", priority: 0.9 },
];

export const OTHER_LANDINGS: Landing[] = [
  {
    // The "free" qualifier on the head terms — a different question from the
    // hub's, so it gets its own page rather than a section.
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

export const ALL_LANDINGS: Landing[] = [...GENERATOR_LANDINGS, ...OTHER_LANDINGS];

/** The other generator pages, for the "More generators" list on each one. */
export function relatedGenerators(currentPath: string, limit = 5) {
  return GENERATOR_LANDINGS.filter((l) => l.path !== currentPath)
    .slice(0, limit)
    .map((l) => ({ href: l.path, label: l.label }));
}
