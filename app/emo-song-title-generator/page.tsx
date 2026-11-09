import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { relatedGenerators } from "@/lib/landings";

// `emo song title generator` — position 67.0 with no page for it.

const PATH = "/emo-song-title-generator";
const TITLE = "Emo Song Title Generator — Free, With the Song to Match";
const DESCRIPTION =
  "An emo song title generator that names the song and then writes and sings it. Type a feeling, get a title, lyrics and a full track. Free to generate and preview.";

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

// Real titles this generator produced, taken from the site owner's own library.
const EXAMPLE_TITLES = [
  "Still Standing in the Wreckage",
  "Forever Was a Four-Letter Word",
  "Glass Between My Teeth",
  "Fate Doesn't Get a Vote",
  "Every Door You Leave Unlocked",
  "Wolves at the Door",
  "Shipwrecked in the Shallow End",
  "Graves We Keep Revisiting",
  "Thirty Thousand Feet and Falling Apart",
  "Wasted Days (Won't Waste Me)",
  "Everything I Never Got to Keep",
  "Gasoline and Glory",
];

const faq: LandingFaq[] = [
  {
    question: "Can I get just a title, without making a song?",
    answer:
      "Every generation names itself, and generating is free — so type your idea, read the title it comes back with, and you're done if that's all you wanted. You only spend a credit if you want the finished audio.",
  },
  {
    question: "What makes a good emo song title?",
    answer:
      "Three patterns cover most of them: a concrete object doing emotional work ('Glass Between My Teeth'), a flat statement that turns at the last word ('Forever Was a Four-Letter Word'), and a parenthetical that undercuts the main phrase ('Wasted Days (Won't Waste Me)'). What they avoid is naming the feeling outright — no title worth having contains the word 'sad'.",
  },
  {
    question: "Can it make midwest emo song titles?",
    answer:
      "Yes, if you prompt it like one. Titles are written from your own words, so a long, conversational, oddly specific prompt ('we sat in your car outside the gas station until it closed') comes back with a title in that register far more often than a mood word does. There's no separate midwest mode — the prompt is the mode.",
  },
  {
    question: "Are the titles different every time?",
    answer:
      "Yes. The same prompt run twice gives different titles, because the title is written alongside the lyrics rather than picked from a list. If you want options, run it three times and keep the best — generating costs nothing.",
  },
  {
    question: "Can I use the title for my own song?",
    answer:
      "Of course. If you make it here, use it wherever you like — for your own track, a playlist, a video or a chapter heading. Nothing stops you.",
  },
];

export default function EmoSongTitleGeneratorPage() {
  return (
    <GeneratorLanding
      eyebrow="Emo song title generator"
      headline="Emo song titles, plus"
      highlight="the song underneath"
      subheading="Type an idea and it names the track — then writes the lyrics and sings them, so the title has something behind it."
      path={PATH}
      breadcrumbName="Emo Song Title Generator"
      productName="Text to Emo — Emo Song Title Generator"
      productDescription="Generates emo and pop-punk song titles alongside full lyrics and a performed track."
      faq={faq}
      related={relatedGenerators(PATH)}
    >
      <p>
        Text to Emo names your song and writes and sings the rest of it — a full emo pop-punk track from your own words in about two minutes, free to try.
      </p>

      <h2>Titles this generator has actually produced</h2>
      <p>
        Not a list of stock phrases — these came out of real generations, each
        one named after the words someone typed in:
      </p>
      <ul>
        {EXAMPLE_TITLES.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p>
        Run yours above and you&apos;ll get one of your own, written from your
        words rather than shuffled out of a word bank.
      </p>

      <h2>Why a title generator on its own is a dead end</h2>
      <p>
        Most emo title generators shuffle two lists together — an adjective and a
        noun — and hand you &ldquo;Broken Midnight&rdquo;. It sounds fine for
        about four seconds, and then you notice it isn&apos;t about anything,
        because nothing generated it except chance.
      </p>
      <p>
        A title earns its keep when it points at a specific thing in the song.
        Here the title is written after the lyrics exist, so it can reference the
        actual image in the second verse. That&apos;s why the examples above read
        like they belong to something.
      </p>

      <h2>The three shapes that keep working</h2>
      <ul>
        <li>
          <strong>Object carrying the feeling.</strong> A physical thing doing
          the emotional lifting — teeth, doors, wreckage, a hoodie.
        </li>
        <li>
          <strong>The turn at the end.</strong> A flat phrase that reverses on
          the last word, so the title has a small joke or wound in it.
        </li>
        <li>
          <strong>The parenthetical.</strong> A second thought that argues with
          the first half. Deeply emo, endlessly reusable.
        </li>
      </ul>

      <h2>Midwest emo song titles</h2>
      <p>
        <strong>
          Midwest emo titles are the opposite of &ldquo;Broken Midnight&rdquo;:
          long, conversational, and often a private joke.
        </strong>{" "}
        The scene that grew out of 1990s Illinois bands like Cap&apos;n Jazz and
        American Football treated the title as one more line of lyric &mdash; a
        sentence fragment, something a friend said, a reference only the band
        understood. The habit carried into 2000s pop punk, which is how a
        Chicago-area band ended up releasing a song called &ldquo;I Slept With
        Someone in Fall Out Boy and All I Got Was This Stupid Song Written About
        Me.&rdquo;
      </p>
      <p>
        To get one here, write the prompt the way you&apos;d say it out loud:
        &ldquo;we sat in your car outside the gas station until it closed&rdquo;
        rather than &ldquo;nostalgia&rdquo;. The title is written from your
        words, so a long, specific line is far more likely to come back with a
        title that sounds like the genre. For the lyrics in the same register,
        use the{" "}
        <Link href="/midwest-emo-lyrics-generator">
          midwest emo lyrics generator
        </Link>
        .
      </p>

      <h2>Getting a title you&apos;d actually use</h2>
      <p>
        Type the specific thing rather than the mood. &ldquo;Sad about
        him&rdquo; yields a forgettable title; &ldquo;he texted happy birthday
        four days late&rdquo; yields one with a detail in it. The same rule that
        governs the{" "}
        <Link href="/emo-lyrics-generator">emo lyrics generator</Link> governs
        the titles, because they&apos;re written together.
      </p>
    </GeneratorLanding>
  );
}
