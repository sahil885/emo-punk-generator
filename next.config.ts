import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: "/blog/how-to-make-a-sad-song-with-ai",
        destination: "/ai-song-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
