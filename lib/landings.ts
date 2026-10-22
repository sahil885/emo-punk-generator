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
  /** One line for /llms.txt, so AI assistants can see what each page is for. */
  summary: string;
  /**
   * The date this page's content last meaningfully changed (YYYY-MM-DD), for
   * <lastmod> in the sitemap. Maintained by hand, like a blog post's date:
   * the build can't read git history, and stamping build time made every URL
   * claim it changed on every deploy, which teaches crawlers to ignore it.
   * Bump it when you change the page's copy — not for styling or chrome.
   */
  updated: string;
}

/** The eight "… generator" pages that cross-link to each other. */
export const GENERATOR_PAGES: Landing[] = [
  { path: "/emo-song-generator", label: "Emo song generator", priority: 0.9,
    summary:
      "the category page: type any words, get a full emo song with sung vocals",
    updated: "2026-10-19", },
  {
    path: "/pop-punk-song-generator",
    label: "Pop punk song generator",
    priority: 0.9,
    summary:
      "pop punk specifically — faster and brighter than emo, built around a shout-along chorus",
    updated: "2026-10-22",
  },
  { path: "/emo-lyrics-generator", label: "Emo lyrics generator", priority: 0.9,
    summary:
      "writes a full emo lyric sheet (verse, chorus, bridge) and sings it back",
    updated: "2026-10-19", },
  { path: "/punk-lyrics-generator", label: "Punk lyrics generator", priority: 0.9,
    summary:
      "short, blunt punk lyrics aimed at a person, a job or a town",
    updated: "2026-10-19", },
  {
    path: "/emo-song-title-generator",
    label: "Emo song title generator",
    priority: 0.9,
    summary:
      "names the song, and writes the track that goes under the title",
    updated: "2026-10-19",
  },
  { path: "/emo-poetry-generator", label: "Emo poetry generator", priority: 0.9,
    summary:
      "emo verses to read on the page, then hear performed if you want",
    updated: "2026-10-19", },
  {
    path: "/midwest-emo-lyrics-generator",
    label: "Midwest emo lyrics generator",
    priority: 0.9,
    summary:
      "conversational, painfully specific midwest-emo-style lyrics",
    updated: "2026-10-19",
  },
  {
    path: "/emo-rap-lyrics-generator",
    label: "Emo rap lyrics generator",
    priority: 0.9,
    summary:
      "emo rap themes, sung over guitars rather than rapped over a beat",
    updated: "2026-10-19",
  },
  { path: "/diss-track-generator", label: "Diss track generator", priority: 0.9,
    summary:
      "a sung pop-punk diss track with a chorus, instead of rap bars",
    updated: "2026-10-19", },
];

/** Commercial pages that aren't part of the generator cross-link set. */
export const OTHER_LANDINGS: Landing[] = [
  { path: "/ai-song-generator", label: "AI song generator", priority: 0.9,
    summary:
      "the head-term hub: how it works, and how it compares to general-purpose tools",
    updated: "2026-10-07", },
  {
    path: "/free-ai-song-generator",
    label: "Free AI song generator",
    priority: 0.9,
    summary:
      "what's free and what isn't — no card to start, no watermark",
    updated: "2026-10-07",
  },
  {
    path: "/turn-texts-into-an-emo-song",
    label: "Turn texts into an emo song",
    priority: 0.9,
    summary:
      "paste a real text message and hear it sung back as a song",
    updated: "2026-10-19",
  },
  { path: "/personalized-song-gift", label: "Personalized song gift", priority: 0.9,
    summary:
      "a song written about one specific person, as a gift",
    updated: "2026-10-22", },
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
