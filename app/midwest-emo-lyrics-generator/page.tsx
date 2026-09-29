import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";

// `midwest emo lyrics generator` — position 67.7 with no page for it.
//
// The honest framing matters here: the production is pop-punk/emo, not twinkly
// midwest emo, so the page is clear that what transfers is the lyrical style.

const PATH = "/midwest-emo-lyrics-generator";
const TITLE = "Midwest Emo Lyrics Generator — Written From Your Words";
const DESCRIPTION =
  "A midwest emo lyrics generator: conversational, run-on, painfully specific lyrics written from your own words and sung back to you. Free to generate and preview.";

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
    question: "Will it sound like American Football?",
    answer:
      "The lyrics will sit in that lane — conversational, specific, unresolved. The music won't. This produces full pop-punk and emo production with drums and distorted guitars, not twinkly clean-tone math riffs in odd time signatures. So: midwest emo writing, performed in a bigger, more polished style than the genre usually gets.",
  },
  {
    question: "What actually makes lyrics midwest emo?",
    answer:
      "Mundane detail treated as devastating. Rooms, drives, seasons, someone's kitchen, a specific month. The lines run long and read like someone talking, they rarely rhyme neatly, and they don't resolve into a tidy chorus statement. It's the opposite of an anthem: quiet, particular and a bit embarrassed.",
  },
  {
    question: "How do I prompt it for the midwest emo feel?",
    answer:
      "Give it a boring specific: 'your kitchen in October', 'the drive back from your parents' house', 'the third time I reheated the same coffee'. Avoid big emotional words entirely. The smaller and more ordinary the detail, the closer the writing lands to the genre.",
  },
  {
    question: "Is it free?",
    answer:
      "Generating lyrics and hearing a 60-second preview are free after you sign in, and your first full song is free. Unlocking the full track costs one credit after that.",
  },
];

export default function MidwestEmoLyricsGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Midwest emo lyrics generator"
      headline="Midwest emo lyrics about"
      highlight="something very small"
      subheading="Conversational, run-on, painfully specific. Type an ordinary detail and get verses back — then hear them sung."
      path={PATH}
      breadcrumbName="Midwest Emo Lyrics Generator"
      productName="Text to Emo — Midwest Emo Lyrics Generator"
      productDescription="Writes midwest-emo-style lyrics — conversational, specific, unresolved — from your own words, and performs them."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <h2>What transfers, and what doesn&apos;t</h2>
      <p>
        Worth saying plainly before you spend two minutes on it: this writes
        midwest emo <em>lyrics</em>. The production behind them is emo and pop
        punk — full drums, distorted guitars, a real chorus. If you came looking
        for clean twinkly arpeggios in 7/8, that isn&apos;t what comes out, and
        no prompt will get you there.
      </p>
      <p>
        What does transfer is the writing: the register, the specificity, the
        refusal to make a neat point. That&apos;s the part most generators get
        wrong, because they treat &ldquo;midwest emo&rdquo; as a synonym for
        &ldquo;sad&rdquo;.
      </p>

      <h2>The rules the genre actually follows</h2>
      <ul>
        <li>
          <strong>Name the month.</strong> Midwest emo is obsessed with time
          passing — Octobers, summers ending, the specific year.
        </li>
        <li>
          <strong>Stay indoors.</strong> Kitchens, cars, bedrooms, someone
          else&apos;s living room at 2am.
        </li>
        <li>
          <strong>Let the line run on.</strong> The lyrics sound like someone
          talking themselves through it, not writing a couplet.
        </li>
        <li>
          <strong>Don&apos;t resolve it.</strong> No lesson at the end. The song
          stops rather than concludes.
        </li>
        <li>
          <strong>Be a bit pathetic.</strong> The genre&apos;s whole charm is
          admitting the thing you&apos;d never say out loud.
        </li>
      </ul>

      <h2>Prompts that get close</h2>
      <p>
        Ordinary beats poetic here, which is the opposite of most songwriting
        advice:
      </p>
      <ul>
        <li>&ldquo;your kitchen in october and neither of us said anything&rdquo;</li>
        <li>&ldquo;i drove past your old house again, not on purpose&rdquo;</li>
        <li>&ldquo;we agreed to stay friends and then never spoke&rdquo;</li>
      </ul>
      <p>
        The female vocalist tends to keep these lighter and more conversational;
        the male vocalist pushes them toward the dramatic. For the wider genre
        map — where midwest emo sits next to pop punk and emo proper — see{" "}
        <Link href="/blog/what-makes-a-song-emo">
          emo vs. pop punk, with examples
        </Link>
        .
      </p>
    </GeneratorLanding>
  );
}
