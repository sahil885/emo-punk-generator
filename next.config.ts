import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The service worker must never be served from cache, or a fix to it
        // could take days to reach installed apps.
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Funnel the old development domain to the canonical one, preserving path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "emo-punk-generator.vercel.app" }],
        destination: "https://texttoemo.com/:path*",
        permanent: true,
      },

      // Consolidated posts. Each earned under 6 impressions in 3 months while
      // splitting relevance with a stronger page on the same intent — see
      // SEO-KEYWORD-AUDIT.md Part 7. Permanent so the equity transfers; the
      // source entries stay in lib/blog.ts (flagged `mergedInto`) so reversing
      // any of these is a one-line change.
      {
        // 1 impression at position 73 in 90 days — the newest and weakest post,
        // folded into the gift cluster as a "best friend" section.
        source: "/blog/song-for-your-best-friend",
        destination: "/personalized-song-gift",
        permanent: true,
      },
      {
        source: "/blog/emo-song-ideas",
        destination: "/blog/turn-your-words-into-an-emo-song",
        permanent: true,
      },
      {
        source: "/blog/make-a-song-about-someone",
        destination: "/personalized-song-gift",
        permanent: true,
      },
      {
        // Never existed, but Google surfaced it (Nov 2026) while people were
        // searching "emo song name generator" — send them to the real page.
        source: "/emo-song-name-generator",
        destination: "/emo-song-title-generator",
        permanent: true,
      },
      {
        source: "/blog/how-to-make-a-sad-song-with-ai",
        destination: "/ai-song-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
