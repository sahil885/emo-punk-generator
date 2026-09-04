import type { Metadata } from "next";
import Link from "next/link";
import { PACKS } from "@/lib/pricing";

// Product page for the brand's own category term.
//
// Evidence: `emo song generator` is only 10–100/month in Keyword Planner (High
// competition) — below the 100+ bar — but it clears the GSC arm of the rule
// comfortably. Last 28 days: `emo song generator` 7 impressions at position
// 22.0, `ai emo song generator` 5 at 28.0, plus `emo song title generator` and
// `text to emo song generator` in the tail. Over 3 months the cluster is ~25
// impressions, all of it landing on blog posts rather than anything
// product-shaped, and all of it ranking in the twenties.
//
// Position 22–28 on your own category name is an on-page problem, not an
// authority one: nothing on the site was structured as "the emo song
// generator". This page is.
//
// Deliberately product-shaped, not article-shaped — Part 4 of the audit found
// question-shaped content gets absorbed by AI Overviews while tool pages keep
// the click, and the homepage converts 7–10x better than any blog post.

const TITLE = "Emo Song Generator — Free AI Emo & Pop Punk Songs";
const DESCRIPTION =
  "An emo song generator that writes the lyrics and sings them. Type any words, pick a vocalist, get a full emo pop punk track in minutes. First songs free.";
const URL = "https://texttoemo.com/emo-song-generator";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/emo-song-generator" },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Text to Emo",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    question: "What is an emo song generator?",
    answer:
      "A tool that writes and performs an emo song from words you give it. You type a phrase, a text message or a feeling; the AI writes lyrics in the emo and pop-punk tradition, then sings them over guitars and drums. Text to Emo writes the lyrics with Claude and performs them with Suno, so you get a finished track rather than a lyric sheet or a backing loop.",
  },
  {
    question: "Is this emo song generator free?",
    answer:
      `Generating a song and hearing a 60-second preview are free once you sign in, and new accounts get free songs to start. You spend a credit only to unlock the full track and download it, from ${PACKS["1pack"].price} a song with packs bringing it down further. No subscription.`,
  },
  {
    question: "How is this different from Suno or a general AI music generator?",
    answer:
      "Suno is a full studio that makes any genre, and it expects you to know how to prompt it — style tags, structure, sometimes your own lyrics. This is one genre with the prompting already done: you paste your words and choose a male or female vocalist, and that's the entire interface. Text to Emo actually uses Suno to perform the songs, so the audio comes from the same place. What you're choosing is whether you want a blank canvas or a finished thing.",
  },
  {
    question: "Does the generator write the emo lyrics too?",
    answer:
      "Yes, and that's the part most tools skip. Claude writes verses, a chorus and a bridge built around whatever you typed — so if you paste a real text message, the lyrics use those actual words rather than generic heartbreak imagery.",
  },
  {
    question: "What emo and pop punk styles can it do?",
    answer:
      "The male vocalist covers Fall Out Boy, Green Day and My Chemical Romance territory — theatrical, hometown-shaped, dramatic. The female vocalist covers Paramore, PVRIS and Avril Lavigne — bright, sharp, with an edge that handles contempt well. Both get full pop-punk production behind them.",
  },
];

export default function EmoSongGeneratorPage() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Text to Emo — Emo Song Generator",
    description:
      "An emo song generator that writes emo and pop punk lyrics from your words and performs them with real sung vocals, guitars and drums in about two minutes.",
    brand: { "@type": "Brand", name: "Text to Emo" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: (PACKS["25pack"].amount / 100 / PACKS["25pack"].credits).toFixed(
        2,
      ),
      highPrice: (PACKS["1pack"].amount / 100).toFixed(2),
      priceCurrency: "USD",
      offerCount: 4,
      availability: "https://schema.org/InStock",
      url: URL,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://texttoemo.com",
      },
      { "@type": "ListItem", position: 2, name: "Emo Song Generator", item: URL },
    ],
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-14">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
        >
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-white/20">›</span>
          <span className="text-white/60">Emo Song Generator</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>🖤</span> Emo song generator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            The emo song generator that{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
              writes and sings
            </span>{" "}
            it for you
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto">
            Type anything — a text, a feeling, a 2am thought. Get back a full
            emo pop-punk song with written lyrics, real sung vocals, guitars and
            drums. No band, no studio, no prompt engineering.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
            >
              ⚡ Generate an emo song free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-bold text-white bg-white/8 hover:bg-white/15 transition-colors"
            >
              See pricing
            </Link>
          </div>
          <p className="text-xs text-white/35 mt-4">
            Free to generate and preview · from {PACKS["1pack"].price} to unlock
            · no subscription
          </p>
        </div>

        <section className="mb-12">
          <p className="text-center text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Hear what it makes
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-3 sm:p-4">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black/40">
              <iframe
                src="https://www.youtube-nocookie.com/embed/3kvHlCvNbtk?rel=0"
                title="The Last Page of a Villain's Fairytale — made with Text to Emo"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-xs text-white/40 mt-3 px-1">
              &ldquo;The Last Page of a Villain&apos;s Fairytale&rdquo; —
              written and produced start to finish by this generator.
            </p>
          </div>
        </section>

        <div className="article-content">
          <h2>How the emo song generator works</h2>
          <ol>
            <li>
              <strong>Type your words.</strong> A text someone sent you, a line
              from your notes app, one sentence about a person. Specific beats
              descriptive every time.
            </li>
            <li>
              <strong>Choose a vocalist.</strong> Male or female. That&apos;s
              the only setting, and it&apos;s the one that matters.
            </li>
            <li>
              <strong>Generate.</strong> Lyrics, vocals, guitars and drums come
              back in about two minutes, with a free 60-second preview.
            </li>
          </ol>

          <h2>Emo song generator vs. Suno</h2>
          <p>
            Worth being straight about this, because it&apos;s the comparison
            people actually make &mdash; and because Text to Emo{" "}
            <em>uses</em> Suno to perform the songs. The audio comes from the
            same engine. What differs is everything in front of it.
          </p>
          <ul>
            <li>
              <strong>Suno is a blank canvas.</strong> Any genre, enormous
              range, and it expects you to bring style tags, song structure and
              often your own lyrics. If you know what you want and how to ask
              for it, it will go further than anything here.
            </li>
            <li>
              <strong>This is one genre, pre-aimed.</strong> The emo and
              pop-punk prompting is already written &mdash; the lyric
              conventions, the quiet-loud dynamics, where a chorus is supposed
              to detonate. You paste words and pick a voice. That&apos;s the
              whole interface.
            </li>
            <li>
              <strong>The lyrics are the real difference.</strong> Claude writes
              them from your input rather than leaving you a blank lyric box.
              Most people arriving at a generator have a feeling and no verses,
              which is exactly the gap that stops them.
            </li>
          </ul>
          <p>
            So: if you want total control across every genre, use Suno directly.
            If you want one specific thing done well without learning to prompt,
            that&apos;s what this is for. The{" "}
            <Link href="/ai-song-generator">wider AI song generator page</Link>{" "}
            covers the general-purpose comparison in more detail.
          </p>

          <h2>What people generate</h2>
          <ul>
            <li>
              <Link href="/turn-texts-into-an-emo-song">
                Songs made from a real text message
              </Link>{" "}
              &mdash; the trend that started all of this
            </li>
            <li>
              <Link href="/blog/emo-breakup-song">Breakup songs</Link> about one
              specific person and one specific night
            </li>
            <li>
              <Link href="/blog/ai-diss-track-generator">
                Sung pop-punk diss tracks
              </Link>{" "}
              &mdash; anthemic rather than rap-shaped
            </li>
            <li>
              <Link href="/personalized-song-gift">
                Personalized songs as gifts
              </Link>{" "}
              for birthdays, anniversaries and best friends
            </li>
            <li>
              <Link href="/blog/songs-like-emo-bands">
                Songs in the style of a specific band
              </Link>{" "}
              you already love
            </li>
          </ul>

          <h2>What you get</h2>
          <ul>
            <li>
              <strong>Real sung vocals</strong>, male or female, not
              text-to-speech
            </li>
            <li>
              <strong>Written emo lyrics</strong> with verses, a chorus and a
              bridge
            </li>
            <li>
              <strong>Full pop-punk production</strong> &mdash; guitars, drums,
              the lot
            </li>
            <li>
              <strong>A free 60-second preview</strong> of every version
            </li>
            <li>
              <strong>An MP3 download</strong> with no watermark, ready for
              TikTok
            </li>
            <li>
              <strong>No subscription</strong>, and credits that never expire
            </li>
          </ul>

          <h2>Generate one now</h2>
          <p>
            One sentence is enough. You don&apos;t need a concept, a plan, or
            any idea what a chord is.{" "}
            <Link href="/">Open the generator</Link>, type the thing
            you&apos;ve been turning over all week, and hear it sung back.
            Generating and previewing are free, and your first songs are free
            &mdash; so trying it costs you two minutes and nothing else.
          </p>
        </div>

        <section className="article-content mt-10">
          <h2>Frequently asked questions</h2>
          {faq.map((f) => (
            <div key={f.question}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 rounded-2xl border border-[#9b30ff]/40 bg-[#0f0520]/80 p-6 text-center">
          <p className="text-xl font-black text-white mb-2">
            Make an emo song now
          </p>
          <p className="text-sm text-white/50 mb-4">
            Generating and a 60-second preview are free. Your first songs are
            free too.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
          >
            ⚡ Open the generator
          </Link>
        </div>
      </div>
    </main>
  );
}
