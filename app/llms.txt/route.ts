import { livePosts } from "@/lib/blog";
import { PACK_LIST, perSong } from "@/lib/pricing";
import { HOME_FAQ, SITE_SUMMARY, SITE_URL } from "@/lib/about";

// /llms.txt — a plain-text summary for AI assistants (llmstxt.org format).
// Built from the same sources as the site, so prices and articles can't drift.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Text to Emo",
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "## Product",
    "",
    `- [Song generator](${SITE_URL}/): type any words, pick a male or female vocalist, get a full emo / pop punk song`,
    `- [Pricing](${SITE_URL}/pricing): free to generate with a 60-second preview; pay only to unlock full songs`,
    "",
    "## Pricing",
    "",
    ...PACK_LIST.map(
      (p) =>
        `- ${p.credits} ${p.credits === 1 ? "song" : "songs"}: ${p.price} (${perSong(p)} per song)`
    ),
    "",
    "## FAQ",
    "",
    ...HOME_FAQ.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Guides",
    "",
    ...livePosts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    "",
    "## Contact",
    "",
    "- Support: sahil@texttoemo.com",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
