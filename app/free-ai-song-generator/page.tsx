import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { FREE_SONGS_PHRASE, PACKS, perSong } from "@/lib/pricing";
import { AUDIO_RETENTION_DAYS } from "@/lib/retention";

// The free-angle page from CONTENT-PLAN.md Priority 1: `ai song generator free`,
// `ai music generator free` and `free ai music generator` (1k–10k US/month each,
// Keyword Planner). The hub at /ai-song-generator owns the head terms; this one
// owns the free qualifier, which is a different question — people adding "free"
// have usually just been burned by a tool that wasn't.
//
// The whole page only works if it's straight about the limits, so the free
// column and the paid column are both stated plainly, daily cap included.

const PATH = "/free-ai-song-generator";
const TITLE = "Free AI Song Generator — No Card, No Watermark";
const DESCRIPTION =
  "Generate songs free with real sung vocals — unlimited runs, a free 60-second preview of every one, and your first full song free. No card to start, no watermark.";

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
    question: "Is this AI song generator actually free?",
    answer:
      `Generating is free and unlimited up to 10 songs a day, and every song comes with a free 60-second preview — lyrics, real vocals, guitars, the lot. Your first full song is free too. After that, unlocking a full track costs one credit: ${PACKS["1pack"].price} for a single song, down to ${perSong(PACKS["25pack"])} a song in a pack. No subscription, and no card needed to start.`,
  },
  {
    question: "Do I have to give a card to try it?",
    answer:
      "No. You sign in with Google or an email link — no payment details — and you can generate and preview as much as you like. A card is only involved if you decide to buy credits.",
  },
  {
    question: "Is there a watermark on the free songs?",
    answer:
      "No. There's no voice-over, no tag and no watermark on anything this makes. The free tier limits how much you can unlock, not what the audio sounds like.",
  },
  {
    question: "What's the catch?",
    answer:
      `Two honest ones. Unlocking the full track and downloading the MP3 costs a credit once your free song is used, and the audio files are removed after ${AUDIO_RETENTION_DAYS} days, so download anything you want to keep. Everything else — generating, previewing, the lyric sheet — stays free.`,
  },
  {
    question: "Can I use the free songs on TikTok or Instagram?",
    answer:
      "Once you unlock a track it downloads as a clean MP3 with no watermark, so yes, post it anywhere. The 60-second preview is for listening in the browser rather than downloading.",
  },
  {
    question: "What genres can I make for free?",
    answer:
      "Emo and pop punk, and only those. That's the trade this tool makes: one genre done properly instead of every genre done approximately. If you need lo-fi, country or orchestral, a general-purpose generator will serve you better.",
  },
];

export default function FreeAiSongGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Free AI song generator"
      headline="A free AI song generator"
      highlight="with real vocals"
      subheading="Generate as many as you like, hear a 60-second preview of every one, and unlock your first full song free. No card to start."
      path={PATH}
      breadcrumbName="Free AI Song Generator"
      productName="Text to Emo — Free AI Song Generator"
      productDescription="Generates full emo and pop punk songs with sung vocals from your own words. Free to generate and preview, with the first full song free."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <h2>What&apos;s free, and what isn&apos;t</h2>
      <p>
        Most tools that answer to &ldquo;free AI song generator&rdquo; mean one
        of three things: free but watermarked, free for thirty seconds, or free
        until you want to hear it again. Here&apos;s the actual split, so you can
        decide before you type anything in.
      </p>
      <ul>
        <li>
          <strong>Free:</strong> writing the lyrics, generating the song, a
          60-second preview of every version you make, the full lyric sheet with
          a copy button, and {FREE_SONGS_PHRASE} unlocked in full when you sign
          up. Up to 10 generations a day.
        </li>
        <li>
          <strong>Paid:</strong> unlocking a full-length track and downloading
          the MP3 after your free one — {PACKS["1pack"].price} for a single
          song, or as little as {perSong(PACKS["25pack"])} a song in a pack.
          One-off; there&apos;s no subscription.
        </li>
      </ul>
      <p>
        No watermark, no voice tag over the chorus, and no card to get started.
      </p>

      <h2>Why the preview is the honest part</h2>
      <p>
        A free tier is only useful if you can tell whether the output is any good
        before paying. That&apos;s what the 60-second preview is for: it&apos;s
        the real song — real sung vocals, real production — just shorter. You
        hear the chorus, which is the part that decides whether a song is worth
        keeping.
      </p>
      <p>
        Generating is unlimited within the daily cap, so the usual workflow is to
        run the same idea three or four times, preview each, and only spend
        anything on the one that made you sit up.
      </p>

      <h2>The limits, stated plainly</h2>
      <ul>
        <li>
          <strong>10 generations a day</strong> on the free tier. Every
          generation costs real money to produce, so the cap is what keeps the
          free tier open at all.
        </li>
        <li>
          <strong>Audio expires after {AUDIO_RETENTION_DAYS} days.</strong>{" "}
          Download anything you unlock and want to keep — once downloaded the
          file is yours permanently.
        </li>
        <li>
          <strong>One genre.</strong> Emo and pop punk. Not a limitation
          we&apos;re apologising for, but it&apos;s not a general-purpose music
          tool.
        </li>
      </ul>

      <h2>Free generator, not a free trial</h2>
      <p>
        There&apos;s no clock running and nothing expires on your account. You
        can come back in three months, generate ten more songs, preview all of
        them, and spend nothing. Credits you buy never expire either.
      </p>
      <p>
        If you want the longer version of how the whole thing works, the{" "}
        <Link href="/ai-song-generator">AI song generator</Link> page covers the
        production side, and{" "}
        <Link href="/pricing">pricing</Link> lists every pack.
      </p>
    </GeneratorLanding>
  );
}
