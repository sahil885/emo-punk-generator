import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { PACKS } from "@/lib/pricing";

// `punk lyrics generator` — position 79.8 with no page for it.

const PATH = "/punk-lyrics-generator";
const TITLE = "Punk Lyrics Generator — Fast, Loud, Sung Back to You";
const DESCRIPTION =
  "A punk lyrics generator that writes short, blunt pop-punk lyrics from your own words and performs them with guitars, drums and real vocals in about two minutes.";

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
    question: "Is this punk or pop punk?",
    answer:
      "Pop punk, honestly — melodic, chorus-driven, in the Green Day, Blink-182 and Sum 41 lane rather than hardcore. If you're after a two-minute song with a hook you can shout, this is built for it. If you want d-beat hardcore or crust, this isn't that tool and it would be unfair to pretend otherwise.",
  },
  {
    question: "How do I make the lyrics angrier?",
    answer:
      "Write the prompt in the second person and name the thing. 'You said you'd show up' gets a sharper song than 'people let me down.' Anger in punk is specific and aimed at someone; the generator follows whatever aim you give it.",
  },
  {
    question: "Can the lyrics swear?",
    answer:
      "They can, and they will if your prompt does. If you're making something for a school project or a client, keep the prompt clean and the lyrics generally follow.",
  },
  {
    question: "What makes punk lyrics different from emo lyrics?",
    answer:
      "Punk lyrics are shorter, blunter and aimed outward — at a person, a job, a town, a rule. Emo lyrics are longer, more inward, and more willing to be pathetic about it. Same three chords, opposite direction of blame.",
  },
  {
    question: "Is the punk lyrics generator free?",
    answer:
      `Generating and previewing are free after you sign in, and your first full song is free. A full track after that is ${PACKS["1pack"].price}, or as little as $1.60 a song in a pack. No subscription.`,
  },
];

export default function PunkLyricsGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Punk lyrics generator"
      headline="Punk lyrics with"
      highlight="a chorus you can shout"
      subheading="Type what's annoying you. Get short, blunt pop-punk lyrics performed with guitars, drums and real vocals."
      path={PATH}
      breadcrumbName="Punk Lyrics Generator"
      productName="Text to Emo — Punk Lyrics Generator"
      productDescription="Writes pop-punk lyrics from your own words and performs them with sung vocals, guitars and drums."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <h2>Punk lyrics are short on purpose</h2>
      <p>
        The genre&apos;s whole trick is compression. A punk chorus is usually one
        idea, repeated, in words a room full of people can shout without reading
        them first. So the generator writes tighter here than it does for a
        ballad: fewer syllables per line, more repetition, and a chorus that
        arrives early rather than after two minutes of scene-setting.
      </p>

      <h2>What to type in</h2>
      <p>
        Punk works best aimed at something. The prompts that produce the best
        tracks tend to be one of these:
      </p>
      <ul>
        <li>
          <strong>A person who did something specific.</strong> &ldquo;You
          borrowed forty quid and blocked me&rdquo;.
        </li>
        <li>
          <strong>A place you want out of.</strong> &ldquo;Nothing in this town
          opens after nine&rdquo;.
        </li>
        <li>
          <strong>A rule that makes no sense.</strong> &ldquo;They said be
          grateful for the overtime&rdquo;.
        </li>
        <li>
          <strong>Yourself, six months ago.</strong> Self-directed punk is
          underrated and it never sounds whiny.
        </li>
      </ul>

      <h2>Choosing the voice</h2>
      <p>
        The male vocalist lands closer to Green Day and Sum 41 — flat, bored,
        then suddenly loud. The female vocalist lands closer to Avril Lavigne and
        Paramore — brighter, more clipped, very good at contempt. Try the same
        prompt with both; it costs nothing and the difference is bigger than
        people expect.
      </p>

      <h2>Punk, emo, or somewhere in between</h2>
      <p>
        The line between the two is blurry and mostly about where you point the
        blame. If your idea is more heartbroken than annoyed, the{" "}
        <Link href="/emo-lyrics-generator">emo lyrics generator</Link> is the
        better starting point — same engine, different lyrical register. If
        you&apos;re not sure which you&apos;re writing, there&apos;s a breakdown
        in{" "}
        <Link href="/blog/what-makes-a-song-emo">
          emo vs. pop punk, with examples
        </Link>
        .
      </p>
    </GeneratorLanding>
  );
}
