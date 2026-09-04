import type { Metadata } from "next";
import Link from "next/link";
import { PACKS } from "@/lib/pricing";

// Head-term hub for `ai song generator` / `ai music generator` (both 10k–100k
// US searches/month, Keyword Planner Aug 2026).
//
// Worth attacking despite the volume: a SERP check on `ai music generator`
// found aisong.io ranking #2 at DA 1 with zero referring domains, so authority
// is not the gate here — relevance and page quality are. See SEO-KEYWORD-AUDIT.
//
// The wedge is specialisation. Every competitor sells "any genre"; this page
// argues one genre done properly beats all genres done adequately, and leans on
// the text-to-song angle where GSC already shows we have traction.

export const metadata: Metadata = {
  title: "AI Song Generator — Turn Your Words Into a Real Song",
  description: `Paste your words and get a full song with sung vocals, guitars, and drums in about two minutes. An AI song generator that makes emo and pop punk properly. From ${PACKS["1pack"].price}.`,
  alternates: { canonical: "/ai-song-generator" },
  openGraph: {
    type: "website",
    url: "https://texttoemo.com/ai-song-generator",
    siteName: "Text to Emo",
    title: "AI Song Generator — Turn Your Words Into a Real Song",
    description:
      "Paste your words, pick a vocalist, get a full song with real vocals in about two minutes. Free to generate and preview.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Song Generator — Turn Your Words Into a Real Song",
    description:
      "Paste your words, pick a vocalist, get a full song with real vocals in about two minutes. Free to generate and preview.",
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    question: "What is an AI song generator?",
    answer:
      "A tool that writes and performs a song for you from a text prompt. You describe what the song should be about, and the AI produces lyrics, a melody, sung vocals, and instrumentation. Text to Emo writes the lyrics with Claude and performs them with Suno, so what comes back is a full track rather than a backing loop.",
  },
  {
    question: "Is there a free AI song generator?",
    answer:
      "Generating a song and hearing a 60-second preview is free here after you sign in, and new accounts get free songs to start. You spend a credit only to unlock the full track and download it, which starts at $3.99 with packs bringing it down to about $1.60 a song. There is no subscription.",
  },
  {
    question: "Can AI make a song from text I paste in?",
    answer:
      "Yes, and it is the thing this generator is built around. Paste a text message, a note from your phone, or a single sentence, and the lyrics get written around your actual words rather than a generic prompt. Short and specific works better than long and explanatory.",
  },
  {
    question: "What genres can this AI song generator make?",
    answer:
      "One family: emo and pop punk — Paramore, Fall Out Boy, My Chemical Romance, Green Day, Avril Lavigne, PVRIS. That is deliberate. If you want any genre on demand, a general-purpose generator will serve you better. If you want this one done convincingly, specialisation is the reason to choose it.",
  },
  {
    question: "Does the AI song generator produce real vocals?",
    answer:
      "Yes — sung vocals, not text-to-speech. You choose a male or female vocalist, and the result has real song structure with verses, a chorus, and a bridge, produced with guitars and drums.",
  },
  {
    question: "Do I own the songs I make?",
    answer:
      "The songs you create are yours to download, post, and share. Once you unlock a track you have 7 days to download the MP3, and after that it is on your device permanently. As with any AI tool, check the current terms for specifics.",
  },
];

export default function AiSongGeneratorPage() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Text to Emo — AI Song Generator",
    description:
      "An AI song generator that turns your words into a full emo or pop punk song with written lyrics, sung vocals, guitars, and drums in about two minutes.",
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
      url: "https://texttoemo.com/ai-song-generator",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Song Generator",
        item: "https://texttoemo.com/ai-song-generator",
      },
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
          <span className="text-white/60">AI Song Generator</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>🎵</span> AI song generator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            The AI song generator that turns{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
              your words
            </span>{" "}
            into a real song
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto">
            Paste a text, a note, or a single sentence. Get back a full track
            with written lyrics, sung vocals, guitars, and drums in about two
            minutes. No instruments, no studio, no idea what a chord is.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
            >
              ⚡ Generate a song free
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
              written and produced start to finish by Text to Emo.
            </p>
          </div>
        </section>

        <div className="article-content">
          <h2>How the AI song generator works</h2>
          <ol>
            <li>
              <strong>Give it your words.</strong> A text message, a line from
              your notes app, a feeling, a single sentence. Specific beats
              descriptive — &quot;you replied to my paragraph with a thumbs
              up&quot; produces a better song than &quot;a song about being
              ignored.&quot;
            </li>
            <li>
              <strong>Pick a vocalist.</strong> Female, in the Paramore, PVRIS,
              or Avril Lavigne range. Or male, with Fall Out Boy, Green Day, and
              My Chemical Romance energy.
            </li>
            <li>
              <strong>Generate and compare.</strong> Claude writes the lyrics
              and Suno performs them. Every version comes with a free 60-second
              preview, so run it a few times and keep the one that sounds like a
              track you&apos;d actually save.
            </li>
          </ol>

          <h2>Why one genre instead of all of them</h2>
          <p>
            Most AI song generators advertise every genre at once. Ask for
            country, jazz, lo-fi, metal — it will produce all of them, and most
            will sound like a competent approximation of the idea of that genre.
          </p>
          <p>
            This one only makes emo and pop punk. That is a real limitation and
            also the entire point: the lyric conventions, the quiet-loud
            dynamics, the way a chorus is supposed to detonate — those are
            specific, and a tool aimed at one target hits it more often than a
            tool aimed at forty. If you want any genre on demand, use a
            general-purpose generator. If you want <em>this</em> convincingly,
            specialisation is the reason to pick it.
          </p>

          <h2>Making a song from text you already have</h2>
          <p>
            The strongest input isn&apos;t a description of a song — it&apos;s
            words that already exist. A screenshot of a text thread. The note
            you wrote at 2am. A voicemail you never deleted. Real language
            carries specifics that invented prompts don&apos;t, and specifics
            are what make lyrics land.
          </p>
          <p>
            That&apos;s the mechanic behind the{" "}
            <Link href="/turn-texts-into-an-emo-song">
              turn your texts into an emo song
            </Link>{" "}
            trend, and it works because you&apos;re not asking the AI to invent
            a feeling — you&apos;re handing it one and asking for a chorus.
          </p>
          <p>
            If you want the genre-specific version of this tool rather than the
            general one, that&apos;s the{" "}
            <Link href="/emo-song-generator">emo song generator</Link>.
          </p>

          <h2>What you get</h2>
          <ul>
            <li>
              <strong>Real sung vocals</strong>, male or female, not
              text-to-speech
            </li>
            <li>
              <strong>Written lyrics</strong> built around your words, with
              verses, a chorus, and a bridge
            </li>
            <li>
              <strong>Full production</strong> — guitars, drums, the lot
            </li>
            <li>
              <strong>A free 60-second preview</strong> of every version before
              you spend anything
            </li>
            <li>
              <strong>An MP3 download</strong> with no watermark. You have 7
              days to save the file; once it&apos;s on your device it&apos;s
              yours to keep
            </li>
            <li>
              <strong>No subscription</strong>, and credits that never expire
            </li>
          </ul>

          <h2>What people make with it</h2>
          <ul>
            <li>
              <Link href="/blog/emo-breakup-song">Breakup songs</Link> about a
              specific person and a specific text
            </li>
            <li>
              <Link href="/blog/ai-diss-track-generator">
                Sung pop punk diss tracks
              </Link>{" "}
              — anthemic rather than rap-shaped
            </li>
            <li>
              <Link href="/personalized-song-gift">
                Personalized songs as gifts
              </Link>{" "}
              for birthdays, anniversaries, and best friends
            </li>
            <li>
              <Link href="/blog/songs-like-emo-bands">
                Songs in the style of specific bands
              </Link>{" "}
              you already love
            </li>
          </ul>

          <h2>Try it on one sentence</h2>
          <p>
            You don&apos;t need a concept or a plan. One real sentence is enough
            for the generator to build a whole song around.{" "}
            <Link href="/">Open it</Link>, type the thing you&apos;ve been
            turning over all week, and hear it sung back to you — generating and
            previewing are free, so the only cost of trying is two minutes.
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
            Type one sentence. Hear a song.
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
