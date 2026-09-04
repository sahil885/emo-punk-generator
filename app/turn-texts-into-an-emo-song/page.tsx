import type { Metadata } from "next";
import Link from "next/link";
import { PACKS } from "@/lib/pricing";

// Transactional landing page for the "turn texts into an emo song" family.
//
// Evidence (GSC, 3 months to 2026-08-19): ~118 impressions across ~20 distinct
// phrasings — `how to turn texts into an emo song` (39), `turn texts into emo
// song` (21), `turn texts into an emo song` (10), `how do you turn texts into
// an emo song` (8), and a long tail of near-identical rewordings. Positions
// range 5.0–26.3. Clicks: zero.
//
// Keyword Planner reports no data for the phrase, so this page exists purely on
// the GSC arm of the shipping rule (20+ existing impressions). That is the
// right call here: Part 4 of the audit established that Planner hides this
// site's real demand pockets below its measurement floor.
//
// Why a root landing page rather than another blog post: the intent is
// transactional. These people want the tool, not an essay about the tool, and
// the homepage converts at 5–6% while blog posts at better positions convert at
// 0.6–0.9%. /blog/turn-your-words-into-an-emo-song stays live for now and keeps
// the editorial treatment; a 301 pointing it here is a deliberate second step,
// once this URL has proven it can rank.

const TITLE = "Turn Texts Into an Emo Song — Free AI Generator";
const DESCRIPTION =
  "Paste any text message and turn it into a full emo song with real vocals in about two minutes. Free to generate and preview. Your first songs are free.";
const URL = "https://texttoemo.com/turn-texts-into-an-emo-song";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/turn-texts-into-an-emo-song" },
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
    question: "How do you turn texts into an emo song?",
    answer:
      "Copy the message, paste it into Text to Emo, pick a male or female vocalist, and generate. Claude writes emo lyrics built around the actual words in that text, and Suno performs them as a full track with vocals, guitars and drums. It takes about two minutes, and generating plus a 60-second preview are free once you sign in.",
  },
  {
    question: "Can I turn a screenshot of a text into a song?",
    answer:
      "Type or paste the words themselves rather than uploading an image. You don't need the whole thread either — one line is usually stronger than twenty. The single worst sentence they sent is a better input than the entire argument, because a chorus needs one idea, not a transcript.",
  },
  {
    question: "Is it free to turn texts into an emo song?",
    answer:
      `Generating and hearing a 60-second preview are free after you sign in, and new accounts get free songs to start. Unlocking the full track and downloading it costs one credit — ${PACKS["1pack"].price} for a single song, less in a pack. There's no subscription.`,
  },
  {
    question: "What kind of texts make the best songs?",
    answer:
      "Specific ones. “We need to talk” is a cliché; “I'm at your mum's, don't come” is a song. Breakup texts, left-on-read threads, the 3am paragraph you never sent, the birthday message that arrived nine days late — anything with a concrete detail in it will produce sharper lyrics than a summary of how you felt.",
  },
  {
    question: "Can I post the song on TikTok?",
    answer:
      "That's what the trend is. Once you unlock a track you can download the MP3 and post it to TikTok or Instagram. Songs built from a real text travel further than generic ones, because everyone watching immediately thinks of a message sitting in their own phone.",
  },
];

export default function TurnTextsIntoAnEmoSongPage() {
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to turn texts into an emo song",
    description:
      "Turn a text message into a full emo song with AI-written lyrics and sung vocals in about two minutes.",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Paste the text",
        text: "Copy the message you want the song to be about and paste it into the generator. One specific line beats a whole thread.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Pick a vocalist",
        text: "Choose a female vocalist in the Paramore, PVRIS and Avril Lavigne range, or a male vocalist with Fall Out Boy, Green Day and My Chemical Romance energy.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Generate and preview",
        text: "Claude writes the lyrics and Suno sings them. Hear a free 60-second preview, then unlock the full track if you want to keep it.",
      },
    ],
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
        name: "Turn Texts Into an Emo Song",
        item: URL,
      },
    ],
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
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
          <span className="text-white/60">Turn Texts Into an Emo Song</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>💬</span> Text → emo song
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Turn texts into an{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
              emo song
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto">
            Paste the message. Pick a voice. Two minutes later it&apos;s a full
            emo track with real vocals, guitars and drums — built around their
            actual words, not a summary of them.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
            >
              ⚡ Paste a text, hear the song
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

        <div className="article-content">
          <h2>How to turn texts into an emo song</h2>
          <ol>
            <li>
              <strong>Paste the text.</strong> The actual message, word for
              word. You can paste a whole thread, but one line usually works
              better — a chorus needs a single idea, not a transcript.
            </li>
            <li>
              <strong>Pick the voice.</strong> Female, in the Paramore, PVRIS
              and Avril Lavigne range. Or male, with Fall Out Boy, Green Day and
              My Chemical Romance energy. Match the temperature of the text, not
              the gender of whoever sent it.
            </li>
            <li>
              <strong>Generate and listen.</strong> Claude writes the lyrics
              around your words and Suno sings them. The preview is free, so run
              it twice and keep whichever version makes you sit up.
            </li>
          </ol>

          <h2>Which texts actually make good songs</h2>
          <p>
            The trend works because real messages contain details nobody would
            invent. &quot;We need to talk&quot; is a cliché. &quot;I&apos;m at
            your mum&apos;s, don&apos;t come&quot; is a song. The more specific
            and slightly humiliating the line, the better the chorus.
          </p>
          <ul>
            <li>
              <strong>The breakup text.</strong> Especially a badly written one.
              Bad prose makes great lyrics because it&apos;s honest by accident.
            </li>
            <li>
              <strong>The one that never got a reply.</strong> Yours or theirs —
              silence has a shape and the genre knows how to sing it.
            </li>
            <li>
              <strong>The apology that wasn&apos;t one.</strong> &quot;Sorry you
              feel that way&quot; has launched a thousand choruses.
            </li>
            <li>
              <strong>The late birthday message.</strong> Nine days late says
              more than a paragraph about neglect ever could.
            </li>
            <li>
              <strong>The 3am paragraph you never sent.</strong> Still in your
              drafts. Still the most honest thing you&apos;ve written this year.
            </li>
          </ul>
          <p>
            If you want the craft reasoning behind why the specific line beats
            the general feeling, it&apos;s laid out in{" "}
            <Link href="/blog/how-to-write-emo-lyrics">
              how to write emo lyrics
            </Link>
            .
          </p>

          <h2>Why emo is the right genre for a text message</h2>
          <p>
            Texts are already confessional, already too much, already sent at
            the wrong hour. That is precisely the emotional register emo and pop
            punk were built for — the genre&apos;s whole posture is{" "}
            <em>saying the embarrassing thing at volume</em>. A soft acoustic
            treatment would make a brutal message sound wistful. A Paramore-shaped
            chorus makes it sound like it deserved a chorus.
          </p>
          <p>
            More on where the genre lines actually fall in{" "}
            <Link href="/blog/what-makes-a-song-emo">
              emo vs. pop punk, sorted out
            </Link>
            .
          </p>

          <h2>What you get back</h2>
          <ul>
            <li>
              <strong>Real sung vocals</strong> — male or female, not
              text-to-speech
            </li>
            <li>
              <strong>Lyrics built from your text</strong>, with verses, a
              chorus and a bridge
            </li>
            <li>
              <strong>Full production</strong> — guitars, drums, the lot
            </li>
            <li>
              <strong>A free 60-second preview</strong> before you spend
              anything
            </li>
            <li>
              <strong>An MP3 download</strong> with no watermark, ready to post
            </li>
          </ul>

          <h2>Paste the text</h2>
          <p>
            You don&apos;t need to explain the situation, justify it, or add
            context. The message is enough.{" "}
            <Link href="/">Open the generator</Link>, paste it in, pick a voice,
            and hear what it sounds like with a chorus behind it. Generating and
            previewing are free, so the only thing it costs you is finding the
            message.
          </p>
          <p>
            You already know which one. It&apos;s the one you screenshot before
            you deleted the thread.
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
            Paste the text. Hear the song.
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

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">
            Related
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/emo-song-generator"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                Emo song generator
              </Link>
            </li>
            <li>
              <Link
                href="/ai-song-generator"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                AI song generator
              </Link>
            </li>
            <li>
              <Link
                href="/personalized-song-gift"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                Personalized song gift
              </Link>
            </li>
            <li>
              <Link
                href="/blog/turn-your-words-into-an-emo-song"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                The longer write-up: turning your texts into an emo song
              </Link>
            </li>
            <li>
              <Link
                href="/blog/emo-breakup-song"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                How to make a song about your ex
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
