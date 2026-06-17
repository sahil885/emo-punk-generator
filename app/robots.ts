import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep API routes out of the index
      disallow: "/api/",
    },
    sitemap: "https://texttoemo.com/sitemap.xml",
    host: "https://texttoemo.com",
  };
}
