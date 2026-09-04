import type { MetadataRoute } from "next";
import { livePosts } from "@/lib/blog";

const BASE = "https://texttoemo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Head-term hub. Commercial intent, so it ranks above the blog in
      // priority and sits alongside /pricing.
      url: `${BASE}/ai-song-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // Commercial landing page — buying intent, so it ranks above the blog in
      // priority and sits alongside /pricing.
      url: `${BASE}/personalized-song-gift`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // Transactional page for the "turn texts into an emo song" family —
      // ~118 GSC impressions across ~20 phrasings, zero clicks, all of it
      // currently landing on a blog post. See the page file for the data.
      url: `${BASE}/turn-texts-into-an-emo-song`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // The brand's own category term. Ranks position 22–28 today because
      // nothing on the site was product-shaped for it.
      url: `${BASE}/emo-song-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...livePosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
