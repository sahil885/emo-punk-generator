import Link from "next/link";
import { PACK_LIST } from "@/lib/pricing";
import {
  FREE_SONGS_ON_SIGNUP,
  HOME_FAQ,
  PRICE_LOWEST_PER_SONG,
  PRICE_SINGLE,
  SITE_SUMMARY,
  SITE_URL,
} from "@/lib/about";

// Server-rendered explainer under the generator. Most AI crawlers don't run
// JavaScript, and before this the homepage gave them about 130 words — a
// tagline and some sample prompts — with no plain statement of what the product
// is or costs. This section and its structured data are that statement.
export default function HomeInfo() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text to Emo",
    url: SITE_URL,
    description: SITE_SUMMARY,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (web browser)",
    featureList: [
      "Turns any text into a full emo or pop punk song",
      "AI-written lyrics with male or female vocals",
      "Free 60-second preview of every song",
      "MP3 download with no watermark",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: (Math.min(...PACK_LIST.map((p) => p.amount)) / 100).toFixed(2),
      highPrice: (Math.max(...PACK_LIST.map((p) => p.amount)) / 100).toFixed(2),
      offerCount: PACK_LIST.length,
      url: `${SITE_URL}/pricing`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="mt-12 sm:mt-14" aria-labelledby="about-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <h2
        id="about-heading"
        className="text-2xl sm:text-3xl font-black text-white text-center mb-4"
      >
        What is Text to Emo?
      </h2>
      <p className="text-sm sm:text-base text-white/60 leading-relaxed text-center max-w-xl mx-auto">
        {SITE_SUMMARY}
      </p>

      <div className="grid gap-3 sm:grid-cols-3 mt-8">
        {[
          {
            step: "1",
            title: "Type your words",
            body: "A feeling, a memory, a text you never sent — anything.",
          },
          {
            step: "2",
            title: "Pick a vocalist",
            body: "Male or female. AI writes the lyrics and produces the song.",
          },
          {
            step: "3",
            title: "Hear it, then unlock",
            body: `Free 60-second preview. ${FREE_SONGS_ON_SIGNUP} free full songs to start.`,
          },
        ].map((s) => (
          <div
            key={s.step}
            className="rounded-2xl border border-white/10 bg-white/3 p-4"
          >
            <p className="text-xs font-black text-[#ff2d78] mb-1">STEP {s.step}</p>
            <h3 className="font-bold text-white text-sm mb-1">{s.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-white/40 mt-4">
        Full songs from {PRICE_SINGLE}, or {PRICE_LOWEST_PER_SONG}/song in a pack ·{" "}
        <Link
          href="/pricing"
          className="underline underline-offset-2 hover:text-white/70 transition-colors"
        >
          See pricing
        </Link>
      </p>

      <h2 className="text-xl sm:text-2xl font-black text-white text-center mt-10 mb-5">
        Questions
      </h2>
      <div className="flex flex-col gap-2.5">
        {HOME_FAQ.map((f) => (
          // <details> keeps answers in the HTML even while collapsed, so
          // crawlers read them without the page taking up extra space.
          <details
            key={f.question}
            className="group rounded-2xl border border-white/10 bg-white/3 px-4 py-3.5"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer text-sm font-bold text-white list-none">
              {f.question}
              <span className="text-[#9b30ff] text-xl leading-none flex-shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-sm text-white/55 leading-relaxed mt-2.5">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
