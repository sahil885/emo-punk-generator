import type { MetadataRoute } from "next";
import { livePosts } from "@/lib/blog";
import { ALL_LANDINGS } from "@/lib/landings";

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
    // Commercial landing pages — buying intent, so they rank above the blog.
    // The list lives in lib/landings.ts so adding a page updates the sitemap,
    // the internal links between them, and the "more generators" lists at once.
    ...ALL_LANDINGS.map((l) => ({
      url: `${BASE}${l.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: l.priority,
    })),
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
