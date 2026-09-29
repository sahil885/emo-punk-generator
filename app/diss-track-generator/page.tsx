import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { PACKS } from "@/lib/pricing";

// `diss track generator` — position 87.0 with no page for it. The existing blog
// post (/blog/ai-diss-track-generator) is the how-to guide; this is the tool
// page, and the two link to each other rather than competing.

const PATH = "/diss-track-generator";
const TITLE = "Diss Track Generator — Sung, With a Chorus That Stings";
const DESCRIPTION =
  "A diss track generator that isn't rap. Type what they did and get a pop-punk roast with a chorus, performed with real vocals in about two minutes. First song free.";

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
    question: "Is this a rap diss track generator?",
    answer:
      "No — and that's deliberate. Almost every diss track generator spits rap bars, so they all sound the same. This makes a sung pop-punk diss with guitars, drums and a chorus. It stands out precisely because nobody expects the roast to be catchy.",
  },
  {
    question: "What should I type for the best roast?",
    answer:
      "The pettiest true detail you have. 'My ex is the worst' gives you nothing; 'you returned my hoodie with someone else's hair on it' gives the chorus a hook. Specific, verifiable and slightly undignified is the sweet spot.",
  },
  {
    question: "Can I post it or send it to them?",
    answer:
      "Once you unlock a track it downloads as an MP3 with no watermark, so you can post it anywhere. Worth keeping it funny rather than cruel — a roast that makes people laugh ages a lot better than one that's just mean, and it's a better idea than aiming something genuinely nasty at a private person.",
  },
  {
    question: "Is the diss track generator free?",
    answer:
      `Generating and hearing a 60-second preview are free after you sign in, and your first full song is free. After that a track is ${PACKS["1pack"].price}, less in a pack.`,
  },
];

export default function DissTrackGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Diss track generator"
      headline="A diss track they can't"
      highlight="even be mad at"
      subheading="Not rap — a sung pop-punk roast with a chorus. Type what they did and hear it back in about two minutes."
      path={PATH}
      breadcrumbName="Diss Track Generator"
      productName="Text to Emo — Diss Track Generator"
      productDescription="Writes a pop-punk diss track from your own words and performs it with sung vocals, guitars and drums."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <h2>Why a sung diss lands harder than a rapped one</h2>
      <p>
        Search for a diss track generator and you get a dozen tools producing rap
        bars. They&apos;re fine, and they&apos;re indistinguishable from each
        other. A pop-punk diss does something none of them manage: it makes the
        insult singable. The roast arrives as a chorus, which means it repeats,
        which means it sticks.
      </p>

      <h2>The receipts make the song</h2>
      <p>
        The generator writes from whatever detail you give it, so the quality of
        the roast is mostly decided before you press the button:
      </p>
      <ul>
        <li>
          <strong>Name the specific crime.</strong> Not &ldquo;you&apos;re
          fake&rdquo; — &ldquo;you said you were busy and posted from the
          bar&rdquo;.
        </li>
        <li>
          <strong>Pettiness is a feature.</strong> The small stuff is funnier
          than the big stuff, and funnier travels further.
        </li>
        <li>
          <strong>Put your best line in the prompt.</strong> Whatever you type
          tends to end up load-bearing in the chorus.
        </li>
      </ul>

      <h2>Choosing the voice</h2>
      <p>
        The female vocalist does venomous and melodic — Paramore-style contempt,
        very good at sounding unbothered while being extremely bothered. The male
        vocalist does cocky and theatrical, closer to Fall Out Boy. Both cost
        nothing to try.
      </p>

      <h2>Good targets</h2>
      <ul>
        <li>The ex who did you dirty, obviously</li>
        <li>The friend who has never once Venmo&apos;d you back</li>
        <li>The group project teammate who did nothing</li>
        <li>A situationship that ghosted, then liked your post</li>
        <li>Yourself, six months ago — self-roasts go surprisingly hard</li>
      </ul>

      <p>
        For the longer version of this — what makes a roast funny rather than
        mean, and how people are posting them — read{" "}
        <Link href="/blog/ai-diss-track-generator">
          how to make a diss track with AI
        </Link>
        .
      </p>
    </GeneratorLanding>
  );
}
