import HomeApp from "@/components/HomeApp";

// The real generator, dropped inline into an article.
//
// Search Console (15 Oct 2026) shows the ranking posts earning impressions and
// almost no clicks: people searching these queries want the tool, and an
// article that only links to it loses them. This is the same component the
// homepage and the generator landing pages run — not a copy — with its chrome
// (auth bar, header, footer) switched off.
export default function GeneratorEmbed() {
  return <HomeApp variant="embed" />;
}
