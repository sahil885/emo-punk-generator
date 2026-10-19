import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";

// `emo rap lyrics generator` — position 83.0 with no page for it.
//
// This is the term where we're furthest from what the searcher may expect: the
// tool sings, it doesn't rap. The page says so in the first paragraph rather
// than burying it, because a page that over-promises just bounces.

const PATH = "/emo-rap-lyrics-generator";
const TITLE = "Emo Rap Lyrics Generator — Sung, Not Rapped";
const DESCRIPTION =
  "Writes emo rap-style lyrics — the themes, the bluntness, the melody — and performs them sung over guitars rather than rapped. Free to generate and preview.";

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
    question: "Does this rap the lyrics?",
    answer:
      "No, and that's the honest answer up front. It writes in the emo rap lyrical register — blunt, first-person, melodic — but performs it sung over guitars and drums, closer to the pop-punk side of Lil Peep or Machine Gun Kelly's Tickets to My Downfall than to a trap beat. If you need rapped verses over 808s, use a rap generator instead.",
  },
  {
    question: "So what is this useful for?",
    answer:
      "The melodic half of emo rap, which is most of its hooks. The genre's choruses are sung, not rapped, and that's exactly what this produces: a sung hook built from your own words, with a full band behind it.",
  },
  {
    question: "What themes does it handle well?",
    answer:
      "The same ones emo rap is built on — numbness, self-sabotage, someone who left, money not fixing it, being awake at the wrong hours. Write the specific version of that and it'll follow you there.",
  },
  {
    question: "Can I use the lyrics over my own beat?",
    answer:
      "Yes. The full lyric sheet appears on the page with a copy button and reading it is free, so plenty of people take the words and produce them elsewhere. You only pay if you want this version's audio.",
  },
];

export default function EmoRapLyricsGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Emo rap lyrics generator"
      headline="Emo rap lyrics, written"
      highlight="then sung back"
      subheading="The themes and bluntness of emo rap, performed as a sung pop-punk track rather than rapped over a beat."
      path={PATH}
      breadcrumbName="Emo Rap Lyrics Generator"
      productName="Text to Emo — Emo Rap Lyrics Generator"
      productDescription="Writes emo rap-style lyrics from your own words and performs them sung over guitars and drums."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <p>
        Text to Emo writes emo rap-style lyrics from your own words and sings them over guitars and drums — a full track in about two minutes, and your first song is free.
      </p>

      <h2>What this is, before you spend two minutes on it</h2>
      <p>
        This writes emo rap <em>lyrics</em> and then sings them. It does not rap
        them, and there are no 808s. What comes back sounds like the pop-punk
        wing of the genre — the sung hooks, the guitars, the crossover records
        rather than the mixtape cuts.
      </p>
      <p>
        That&apos;s a real limitation and it&apos;s better said now than
        discovered after you&apos;ve typed something personal into the box. If
        rapped verses are the point, this is the wrong tool.
      </p>

      <h2>Why the sung half still matters</h2>
      <p>
        Emo rap&apos;s most repeated moments are almost never the verses. They&apos;re
        the hooks — melodic, short, repeated, and sung. That&apos;s the part this
        produces well, because it&apos;s the same machinery that writes an emo
        chorus: one idea, a strong image, and a melody built to stick.
      </p>

      <h2>Writing the prompt</h2>
      <ul>
        <li>
          <strong>Be blunt.</strong> The genre doesn&apos;t do metaphor for its
          own sake. Say the thing.
        </li>
        <li>
          <strong>First person, present tense.</strong> &ldquo;I&apos;m still
          awake and it&apos;s your fault&rdquo;.
        </li>
        <li>
          <strong>One detail that dates it.</strong> A name, an hour, an amount
          of money, a room.
        </li>
      </ul>

      <h2>Related</h2>
      <p>
        If what you actually want is the straight emo version, start with the{" "}
        <Link href="/emo-lyrics-generator">emo lyrics generator</Link>. If you
        want it aimed at someone in particular, the{" "}
        <Link href="/diss-track-generator">diss track generator</Link> is the
        sharper tool.
      </p>
    </GeneratorLanding>
  );
}
