import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { PACKS } from "@/lib/pricing";

// Product page for the brand's own category term.
//
// Oct 2026: this page earned no impressions for `emo song generator` because
// the homepage carried an identical title and Google showed that instead. The
// homepage is now brand-led ("Text To Emo — Turn Any Words Into an Emo Song")
// and this page keeps the category term.
//
// It also runs the generator itself rather than describing it and linking away:
// the pages that outrank us on these terms put the tool on the page.

const PATH = "/emo-song-generator";
const TITLE = "Emo Song Generator — Write and Sing Your Own in Minutes";
const DESCRIPTION =
  "Paste one line, pick a male or female vocalist, and this emo song generator writes the lyrics and performs them with guitars and drums. Free to try, no card needed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: `https://texttoemo.com${PATH}`,
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

const faq: LandingFaq[] = [
  {
    question: "What is an emo song generator?",
    answer:
      "A tool that writes and performs an emo song from words you give it. You type a phrase, a text message or a feeling; the AI writes lyrics in the emo and pop-punk tradition, then sings them over guitars and drums. Text to Emo writes the lyrics with Claude and performs them with Suno, so you get a finished track rather than a lyric sheet or a backing loop.",
  },
  {
    question: "Is this emo song generator free?",
    answer: `Generating a song and hearing a 60-second preview are free once you sign in, and your first full song is free. You spend a credit only to unlock the full track and download it, from ${PACKS["1pack"].price} a song with packs bringing it down further. No subscription.`,
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
  return (
    <GeneratorLanding
      eyebrow="Emo song generator"
      headline="The emo song generator that"
      highlight="writes and sings"
      headlineTail="it for you"
      subheading="Type anything — a text, a feeling, a 2am thought. Get back a full emo pop-punk song with lyrics, real sung vocals, guitars and drums."
      path={PATH}
      breadcrumbName="Emo Song Generator"
      productName="Text to Emo — Emo Song Generator"
      productDescription="An emo song generator that writes emo and pop punk lyrics from your words and performs them with real sung vocals, guitars and drums in about two minutes."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <p>
        Text to Emo writes and sings a full emo or pop-punk song from your own
        words in about two minutes, and your first song is free.
      </p>

      <h2>Hear what it makes</h2>
      <div className="rounded-2xl border border-white/10 bg-white/3 p-3 sm:p-4 my-6">
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
      </div>

      <h2>How the emo song generator works</h2>
      <ol>
        <li>
          <strong>Type your words.</strong> A text someone sent you, a line from
          your notes app, one sentence about a person. Specific beats
          descriptive every time.
        </li>
        <li>
          <strong>Choose a vocalist.</strong> Male or female. That&apos;s the
          only setting, and it&apos;s the one that matters.
        </li>
        <li>
          <strong>Generate.</strong> Lyrics, vocals, guitars and drums come back
          in about two minutes, with a free 60-second preview.
        </li>
      </ol>

      <h2>Emo song generator vs. Suno</h2>
      <p>
        Worth being straight about this, because it&apos;s the comparison people
        actually make &mdash; and because Text to Emo <em>uses</em> Suno to
        perform the songs. The audio comes from the same engine. What differs is
        everything in front of it.
      </p>
      <ul>
        <li>
          <strong>Suno is a blank canvas.</strong> Any genre, enormous range, and
          it expects you to bring style tags, song structure and often your own
          lyrics. If you know what you want and how to ask for it, it will go
          further than anything here.
        </li>
        <li>
          <strong>This is one genre, pre-aimed.</strong> The emo and pop-punk
          prompting is already written &mdash; the lyric conventions, the
          quiet-loud dynamics, where a chorus is supposed to detonate. You paste
          words and pick a voice. That&apos;s the whole interface.
        </li>
        <li>
          <strong>The lyrics are the real difference.</strong> Claude writes them
          from your input rather than leaving you a blank lyric box. Most people
          arriving at a generator have a feeling and no verses, which is exactly
          the gap that stops them.
        </li>
      </ul>
      <p>
        So: if you want total control across every genre, use Suno directly. If
        you want one specific thing done well without learning to prompt,
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
          <Link href="/diss-track-generator">Sung pop-punk diss tracks</Link>{" "}
          &mdash; anthemic rather than rap-shaped
        </li>
        <li>
          <Link href="/personalized-song-gift">Personalized songs as gifts</Link>{" "}
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
          <strong>Real sung vocals</strong>, male or female, not text-to-speech
        </li>
        <li>
          <strong>Written emo lyrics</strong> with verses, a chorus and a bridge
        </li>
        <li>
          <strong>Full pop-punk production</strong> &mdash; guitars, drums, the
          lot
        </li>
        <li>
          <strong>A free 60-second preview</strong> of every version
        </li>
        <li>
          <strong>An MP3 download</strong> with no watermark, ready for TikTok
        </li>
        <li>
          <strong>No subscription</strong>, and credits that never expire
        </li>
      </ul>

      <h2>Generate one now</h2>
      <p>
        One sentence is enough. You don&apos;t need a concept, a plan, or any
        idea what a chord is. Scroll back up, type the thing you&apos;ve been
        turning over all week, and hear it sung back. Generating and previewing
        are free, and your first song is free &mdash; so trying it costs you two
        minutes and nothing else.
      </p>
    </GeneratorLanding>
  );
}
