import type { MetadataRoute } from "next";

// Makes texttoemo.com installable as an app (home-screen icon, opens full
// screen without browser chrome). Icons come from scripts/generate-pwa-icons.mjs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    // `id` is what the OS uses to recognise the installed app — keep it fixed
    // so start_url can change later without creating a second app.
    id: "/",
    name: "Text to Emo — AI Emo Song Generator",
    short_name: "Text to Emo",
    description:
      "Turn any words into a full emo pop punk song — AI lyrics and a sung vocal in about two minutes.",
    // The UTM tags make home-screen launches show up as their own source in
    // GA4, so it's measurable whether app users come back and buy.
    start_url: "/?utm_source=homescreen&utm_medium=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#0a0208",
    theme_color: "#0a0208",
    categories: ["music", "entertainment"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
