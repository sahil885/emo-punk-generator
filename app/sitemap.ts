import type { MetadataRoute } from "next";
import { livePosts } from "@/lib/blog";
import { ALL_LANDINGS } from "@/lib/landings";

const BASE = "https://texttoemo.com";

// <lastmod> dates are real content-change dates, not build time.
//
// Every entry here used to be `new Date()`, so each deploy told crawlers that
// 15 of 26 URLs had just changed — including pages untouched for months. A
// lastmod that's always "now" carries no information, and Google discounts the
// signal for the whole site once it stops matching what actually changed.
//
// Landing pages carry their own `updated` date in lib/landings.ts. The three
// below are maintained here; bump one when that page's copy changes.
const HOME_UPDATED = "2026-10-19"; // components/HomeApp.tsx + HomeInfo.tsx
const PRICING_UPDATED = "2026-09-29";

export default function sitemap(): MetadataRoute.Sitemap {
  // The blog index changes when a post is published, so date it from the
  // newest live post rather than by hand.
  const newestPost = livePosts.reduce(
    (latest, p) => ((p.updated ?? p.date) > latest ? (p.updated ?? p.date) : latest),
    livePosts[0]?.date ?? HOME_UPDATED
  );

  return [
    {
      url: BASE,
      lastModified: new Date(HOME_UPDATED),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date(PRICING_UPDATED),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Commercial landing pages — buying intent, so they rank above the blog.
    // The list lives in lib/landings.ts so adding a page updates the sitemap,
    // the internal links between them, /llms.txt and the "more generators"
    // rows at once.
    ...ALL_LANDINGS.map((l) => ({
      url: `${BASE}${l.path}`,
      lastModified: new Date(l.updated),
      changeFrequency: "monthly" as const,
      priority: l.priority,
    })),
    {
      url: `${BASE}/blog`,
      lastModified: new Date(newestPost),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...livePosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
