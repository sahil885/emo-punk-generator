import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { PACKS } from "@/lib/pricing";

// `pop punk song generator` — a gap rather than a guess: the term sits in the
// site's own keyword list, the product literally produces pop punk, and no page
// was aimed at it. The Oct 2026 Search Console check also showed the
// style-specific page (/midwest-emo-lyrics-generator) was the best performer of
// the new set, which is the argument for a genre-specific page over another
// variation on "emo".
//
// Kept distinct from /punk-lyrics-generator (lyrics, angrier, aimed outward)
// and /emo-song-generator (the sadder, inward half of the same engine).

const PATH = "/pop-punk-song-generator";
const TITLE = "Pop Punk Song Generator — Hooks, Guitars, Real Vocals";
const DESCRIPTION =
  "Type a line and get a full pop punk song back: fast drums, big guitars and a shout-along chorus, sung by a male or female vocalist. Free to try, first song free.";

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
    question: "What does the pop punk song generator produce?",
    answer:
      "A complete song, not a backing track: original lyrics written around your words, a sung vocal, guitars, bass and drums, arranged with verses and a chorus. You hear a free 60-second preview first, and the finished track runs two to three minutes.",
  },
  {
    question: "Does it sound like Blink-182 or Green Day?",
    answer:
      "It sits in that tradition — fast tempos, power chords, a melodic chorus built for a crowd — without imitating any particular band. The male vocalist lands nearer Green Day and Sum 41; the female vocalist nearer Avril Lavigne and Paramore. What you get is an original song in the style, not a soundalike.",
  },
  {
    question: "What's the difference between this and the emo generator?",
    answer:
      "Where the feeling points. Pop punk is faster and brighter, aimed outward at a town, a job, a person or a summer; emo is more dynamic and aimed inward at your own head. Same engine, different lyrical register — so pick this one if you want the shout-along version rather than the devastating one.",
  },
  {
    question: "What should I type in?",
    answer:
      "Something with a bit of attitude and one concrete detail. 'Nothing in this town opens after nine' beats 'I'm bored.' Pop punk lyrics work best when they're aimed at something specific, even if the something is your own hometown.",
  },
  {
    question: "Is the pop punk song generator free?",
    answer: `Generating and hearing a 60-second preview are free once you sign in, and your first full song is free. After that, unlocking a full track costs one credit — ${PACKS["1pack"].price} for a single song, less in a pack. No subscription.`,
  },
];

export default function PopPunkSongGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Pop punk song generator"
      headline="A pop punk song with"
      highlight="a chorus you can shout"
      subheading="Type a line about a person, a town or a summer. Get a full pop punk track — guitars, drums and a sung hook — in about two minutes."
      path={PATH}
      breadcrumbName="Pop Punk Song Generator"
      productName="Text to Emo — Pop Punk Song Generator"
      productDescription="Writes a pop punk song from your own words — lyrics, sung vocals, guitars and drums — in about two minutes."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <p>
        Text to Emo writes and sings a full pop-punk song from your own words in
        about two minutes, and your first song is free.
      </p>

      <h2>What makes it pop punk rather than emo</h2>
      <p>
        Same guitars, opposite direction. Pop punk is quick, bright and aimed
        outward &mdash; at a town you want out of, a job that wastes you, a
        person who let you down, a summer that ended. Emo takes the same
        instruments and points them at your own head.
      </p>
      <p>
        So the generator writes differently here: shorter lines, more
        repetition, a chorus that arrives early and comes back often, and
        noticeably less self-pity. If you want the devastating version instead,
        the <Link href="/emo-song-generator">emo song generator</Link> is the
        same engine with the other setting.
      </p>

      <h2>What to type in</h2>
      <p>
        Pop punk is specific and a bit funny about being miserable. The prompts
        that land tend to be one of these:
      </p>
      <ul>
        <li>
          <strong>A town, named.</strong> &ldquo;Nothing here opens after
          nine&rdquo; is a better first line than &ldquo;I&apos;m bored.&rdquo;
        </li>
        <li>
          <strong>A summer with an end date.</strong> The genre runs on things
          that are about to be over.
        </li>
        <li>
          <strong>Someone who let you down in a small way.</strong> Small beats
          tragic; pop punk is for annoyance, not grief.
        </li>
        <li>
          <strong>A decision you keep not making.</strong> Leaving, quitting,
          texting back.
        </li>
      </ul>

      <h2>Picking the voice</h2>
      <p>
        The male vocalist sits nearer Green Day, Blink-182 and Sum 41 &mdash;
        flat and bored in the verse, loud in the chorus. The female vocalist
        sits nearer Avril Lavigne and Paramore &mdash; brighter, sharper, very
        good at sounding unimpressed. Running the same line through both costs
        nothing and usually settles the question faster than thinking about it.
      </p>

      <h2>What you get back</h2>
      <ul>
        <li>
          <strong>A full track</strong> &mdash; verses, a chorus and a bridge,
          two to three minutes
        </li>
        <li>
          <strong>Real sung vocals</strong>, male or female, not text-to-speech
        </li>
        <li>
          <strong>The written lyrics</strong> on the page, with a copy button
        </li>
        <li>
          <strong>A free 60-second preview</strong> of every version you make
        </li>
        <li>
          <strong>An MP3 download</strong> with no watermark once you unlock it
        </li>
      </ul>

      <h2>Pop punk, emo, or somewhere between</h2>
      <p>
        Most people arrive wanting one and leaving with the other, which is
        fine: the line between the two has been argued over for twenty years and
        plenty of bands sit on it. If you want the distinction drawn properly
        &mdash; tempo, vocals, lyrics, which bands fall where &mdash; it&apos;s
        laid out in{" "}
        <Link href="/blog/what-makes-a-song-emo">
          emo vs. pop punk, with examples
        </Link>
        . If you only want the words rather than the whole song, try the{" "}
        <Link href="/punk-lyrics-generator">punk lyrics generator</Link>.
      </p>
    </GeneratorLanding>
  );
}
