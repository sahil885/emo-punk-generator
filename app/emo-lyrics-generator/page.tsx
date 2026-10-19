import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";
import { PACKS } from "@/lib/pricing";

// `emo lyrics generator` — position 71.6 in Search Console with no page aimed
// at it, so Google was ranking blog posts. This one is product-shaped and puts
// the working generator above the copy.

const PATH = "/emo-lyrics-generator";
const TITLE = "Emo Lyrics Generator — Written and Sung in 2 Minutes";
const DESCRIPTION =
  "An emo lyrics generator that writes full verses, a chorus and a bridge from your own words — then sings them back with real vocals. Free to try, first song free.";

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
    question: "Does this write the lyrics, or just the music?",
    answer:
      "It writes the lyrics first. Claude writes a verse, a pre-chorus, a chorus and a bridge built around the words you type, and the full lyric sheet is shown on screen with a copy button. The music and vocals are then built on top of those exact lyrics, so what you read is what you hear.",
  },
  {
    question: "Can I use the lyrics on their own?",
    answer:
      "Yes. Generating a song and reading its lyrics costs nothing — you can copy the lyric sheet straight off the page. You only spend a credit when you want the finished audio: the full track and the MP3 download.",
  },
  {
    question: "Can I edit the lyrics it writes?",
    answer:
      "Not inside the tool — there's no lyric editor. What most people do is regenerate a few times, since each run rephrases around your words differently, then copy the version they like and edit it wherever they write. Generating is free, so trying five is free.",
  },
  {
    question: "How do I stop the lyrics sounding generic?",
    answer:
      "Give it something only you would say. 'My ex was awful' produces stock heartbreak; 'you returned my hoodie with someone else's hair on it' produces a line no other song has. The generator builds imagery out of the detail you hand it, so concrete beats emotional every time.",
  },
  {
    question: "Is the emo lyrics generator free?",
    answer:
      `Writing lyrics and hearing a 60-second preview are free once you sign in, and your first full song is free. After that a full track is ${PACKS["1pack"].price}, less in a pack, with no subscription.`,
  },
];

export default function EmoLyricsGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Emo lyrics generator"
      headline="Emo lyrics, written"
      highlight="and sung back"
      headlineTail="to you"
      subheading="Type a feeling or a text message. Get a full lyric sheet — verse, chorus, bridge — performed with real vocals."
      path={PATH}
      breadcrumbName="Emo Lyrics Generator"
      productName="Text to Emo — Emo Lyrics Generator"
      productDescription="Writes original emo and pop-punk lyrics from your own words and performs them with sung vocals, guitars and drums."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <p>
        Text to Emo writes emo lyrics from your own words and sings them back as a full pop-punk song in about two minutes, and your first song is free.
      </p>

      <h2>What the lyrics generator actually writes</h2>
      <p>
        Most lyrics generators hand you a block of rhyming text and stop. This
        one writes a song: a first verse that sets the scene, a pre-chorus that
        tightens, a chorus built to be shouted, and a bridge where the whole
        thing falls apart before the last chorus. Structure is most of what makes
        lyrics sound like a real song rather than a poem with a rhyme scheme.
      </p>
      <p>
        You see the complete lyric sheet on screen with a copy button, and you
        hear those same words sung — no paraphrasing between the page and the
        track.
      </p>

      <h2>Write the prompt like a detail, not a summary</h2>
      <p>
        The single biggest difference between lyrics that land and lyrics that
        sound like every other AI song is what you type in. Compare:
      </p>
      <ul>
        <li>
          <strong>&ldquo;Sad about my breakup&rdquo;</strong> — the generator has
          nothing to work with, so it reaches for the genre&apos;s defaults:
          rain, streetlights, empty rooms.
        </li>
        <li>
          <strong>&ldquo;You still have my hoodie and I&apos;m not asking for
          it&rdquo;</strong> — now there&apos;s an object, a decision and some
          pride to work with. That line ends up in the chorus.
        </li>
      </ul>
      <p>
        One specific noun does more than three sentences of feeling. If
        you&apos;re stuck, paste the actual message someone sent you — that
        technique has its own guide in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>
        .
      </p>

      <h2>Two vocal styles, two lyrical registers</h2>
      <p>
        The vocalist you choose changes how the lyrics are written, not just who
        sings them. The male vocalist sits in Fall Out Boy and My Chemical
        Romance territory — wordier lines, theatrical imagery, a touch of
        self-mythology. The female vocalist writes closer to Paramore and Avril
        Lavigne: shorter, sharper, more contempt and less apology. The same
        prompt run twice with different vocalists gives you two genuinely
        different lyric sheets.
      </p>

      <h2>When you want lyrics only</h2>
      <p>
        Plenty of people use this as a writing tool: generate three versions of
        an idea for free, read the lyric sheets, and take the two lines worth
        keeping into whatever they were already writing. That&apos;s a perfectly
        reasonable way to use it, and it costs nothing — the credit is only for
        the finished audio.
      </p>
    </GeneratorLanding>
  );
}
