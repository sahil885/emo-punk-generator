import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";

// `emo poetry generator` — position 65.3 with no page for it.

const PATH = "/emo-poetry-generator";
const TITLE = "Emo Poetry Generator — Read It, Then Hear It Sung";
const DESCRIPTION =
  "An emo poetry generator that writes verses from your own words — then performs them as a full song, so you can read the poem and hear it. Free to generate.";

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
    question: "Is this poetry or song lyrics?",
    answer:
      "Both, and it's worth being straight about the difference. What it writes is structured as a song — verse, chorus, bridge — so it repeats and it's built to be sung. That makes it lyric poetry rather than free verse. If you want something with no chorus and no repetition, this will feel too regular for you.",
  },
  {
    question: "Can I read it without the music?",
    answer:
      "Yes. The full text appears on the page with a copy button as soon as it's written, before any audio exists, and reading it costs nothing. The music is optional.",
  },
  {
    question: "What makes writing 'emo' rather than just sad?",
    answer:
      "Emo writing is specific, physical and a little undignified. It names the object — the voicemail, the hoodie, the passenger seat — instead of describing the feeling, and it admits things a more composed poem wouldn't. Vagueness is what makes sad writing forgettable.",
  },
  {
    question: "Can I use it for a poem I'm writing myself?",
    answer:
      "People do. Generate a few free versions of your idea, read them, keep the one image that's better than anything you had, and write around it. Since generating is free, it's a cheap way to argue with yourself about a line.",
  },
];

export default function EmoPoetryGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Emo poetry generator"
      headline="Emo poetry you can"
      highlight="read and hear"
      subheading="Type what you can't say out loud. Get verses back on the page — then hear them performed with vocals and guitars."
      path={PATH}
      breadcrumbName="Emo Poetry Generator"
      productName="Text to Emo — Emo Poetry Generator"
      productDescription="Writes emo verses from your own words and performs them as a full song with sung vocals."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <h2>Poetry that doesn&apos;t stop at the page</h2>
      <p>
        Emo has always sat on the border between poetry and music — the lyric
        sheets people copied into notebooks in 2005 were read far more often than
        they were sung. This writes for that border: verses you can read on their
        own, that also work when a voice and a guitar get behind them.
      </p>
      <p>
        You get the written text first. The audio comes after, and only if you
        want it.
      </p>

      <h2>What separates emo verse from a sad poem</h2>
      <ul>
        <li>
          <strong>Objects, not adjectives.</strong> &ldquo;The mug you left is
          still in the cupboard&rdquo; does more than three lines about loss.
        </li>
        <li>
          <strong>Present tense.</strong> Emo happens now, in the room, not in
          reflection.
        </li>
        <li>
          <strong>A willingness to be undignified.</strong> The best lines in the
          genre admit something slightly embarrassing. Composure is the enemy.
        </li>
        <li>
          <strong>One moment, held still.</strong> Not the whole relationship —
          the four seconds after the door closed.
        </li>
      </ul>

      <h2>Writing the prompt</h2>
      <p>
        Give it a scene rather than a mood. &ldquo;I feel empty&rdquo; is a
        summary; &ldquo;I keep checking if you&apos;re typing&rdquo; is an image
        with a whole poem folded into it. The generator expands what you give it
        — so hand it something with edges.
      </p>

      <h2>If you want it sung</h2>
      <p>
        Choosing a vocalist changes the register of the writing itself: the
        female voice writes sharper and shorter, the male voice writes more
        theatrically. If your interest is in the lyric craft specifically,
        there&apos;s more detail in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>{" "}
        and in the{" "}
        <Link href="/emo-lyrics-generator">emo lyrics generator</Link>.
      </p>
    </GeneratorLanding>
  );
}
