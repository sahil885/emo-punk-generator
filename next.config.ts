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
    ];
  },
};

export default nextConfig;
