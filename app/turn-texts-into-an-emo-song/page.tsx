import type { Metadata } from "next";
import Link from "next/link";
import GeneratorLanding, { type LandingFaq } from "@/components/GeneratorLanding";
import { PACKS } from "@/lib/pricing";

// The trend page for the "turn your texts into a song" family — the one query
// group where the searcher wants to do the thing, not read about it.
//
// The Sept 2026 audit found this page had registered a single impression in 90
// days: no internal links pointing at it, and the generator a click away rather
// than on the page. It now runs the generator itself and is linked from the
// homepage and every article.

const PATH = "/turn-texts-into-an-emo-song";
const TITLE = "Turn Texts Into an Emo Song — Paste It, Hear It Sung";
const DESCRIPTION =
  "The TikTok trend, done properly: paste a real text message and hear it sung back as a full emo song with vocals, guitars and drums in about two minutes. First song free.";

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
    question: "How do you turn texts into an emo song?",
    answer:
      "Copy the message, paste it into the box on this page, pick a male or female vocalist, and generate. Claude writes emo lyrics built around the actual words in that text, and Suno performs them as a full track with vocals, guitars and drums. It takes about two minutes, and generating plus a 60-second preview are free once you sign in.",
  },
  {
    question: "Can I turn a screenshot of a text into a song?",
    answer:
      "Type or paste the words themselves rather than uploading an image. You don't need the whole thread either — one line is usually stronger than twenty. The single worst sentence they sent is a better input than the entire argument, because a chorus needs one idea, not a transcript.",
  },
  {
    question: "Is it free to turn texts into an emo song?",
    answer:
      `Generating and hearing a 60-second preview are free after you sign in, and new accounts get a free song to start. Unlocking the full track and downloading it costs one credit — ${PACKS["1pack"].price} for a single song, less in a pack. There's no subscription.`,
  },
  {
    question: "What kind of texts make the best songs?",
    answer:
      "Specific ones. “We need to talk” is a cliché; “I'm at your mum's, don't come” is a song. Breakup texts, left-on-read threads, the 3am paragraph you never sent, the birthday message that arrived nine days late — anything with a concrete detail in it will produce sharper lyrics than a summary of how you felt.",
  },
  {
    question: "How do I post it to TikTok?",
    answer:
      "Unlock the track, download the MP3, and upload it in the TikTok app with your own visuals — the usual format is a screen recording or photo of the message, with the chorus playing over it. There's no one-tap export from here; you download the file and post it yourself.",
  },
];

export default function TurnTextsIntoAnEmoSongPage() {
  return (
    <GeneratorLanding
      eyebrow="Text → emo song"
      headline="Turn your texts into an"
      highlight="emo song"
      subheading="Paste the message below. Two minutes later it's a full emo track built around their actual words — not a summary of them."
      path={PATH}
      breadcrumbName="Turn Texts Into an Emo Song"
      productName="Text to Emo — Turn Texts Into an Emo Song"
      productDescription="Turns a real text message into a full emo song with lyrics built from its exact words, performed with sung vocals, guitars and drums."
      faq={faq}
    >
      <h2>What the trend is</h2>
      <p>
        Someone takes a message that wrecked them — a breakup text, a
        left-on-read thread, an apology that wasn&apos;t one — and posts it as a
        song instead of a screenshot. The video shows the message; the audio
        turns it into a chorus. It works because everyone watching immediately
        thinks of something sitting in their own phone.
      </p>
      <p>
        The generator above is the part that makes the song. Paste the text, pick
        a voice, and it writes the lyrics around those exact words.
      </p>

      <h2>How to turn texts into an emo song</h2>
      <ol>
        <li>
          <strong>Paste the text.</strong> The actual message, word for word. You
          can paste a whole thread, but one line usually works better — a chorus
          needs a single idea, not a transcript.
        </li>
        <li>
          <strong>Pick the voice.</strong> Female, in the Paramore, PVRIS and
          Avril Lavigne range. Or male, with Fall Out Boy, Green Day and My
          Chemical Romance energy. Match the temperature of the text, not the
          gender of whoever sent it.
        </li>
        <li>
          <strong>Generate and listen.</strong> Claude writes the lyrics around
          your words and Suno sings them. The preview is free, so run it twice
          and keep whichever version makes you sit up.
        </li>
      </ol>

      <h2>Which texts actually make good songs</h2>
      <p>
        The trend works because real messages contain details nobody would
        invent. &quot;We need to talk&quot; is a cliché. &quot;I&apos;m at your
        mum&apos;s, don&apos;t come&quot; is a song. The more specific and
        slightly humiliating the line, the better the chorus.
      </p>
      <ul>
        <li>
          <strong>The breakup text.</strong> Especially a badly written one. Bad
          prose makes great lyrics because it&apos;s honest by accident.
        </li>
        <li>
          <strong>The one that never got a reply.</strong> Yours or theirs —
          silence has a shape and the genre knows how to sing it.
        </li>
        <li>
          <strong>The apology that wasn&apos;t one.</strong> &quot;Sorry you feel
          that way&quot; has launched a thousand choruses.
        </li>
        <li>
          <strong>The late birthday message.</strong> Nine days late says more
          than a paragraph about neglect ever could.
        </li>
        <li>
          <strong>The 3am paragraph you never sent.</strong> Still in your
          drafts. Still the most honest thing you&apos;ve written this year.
        </li>
      </ul>
      <p>
        If you want the craft reasoning behind why the specific line beats the
        general feeling, it&apos;s laid out in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>
        .
      </p>

      <h2>Posting it to TikTok</h2>
      <p>
        There&apos;s no one-tap export — you unlock the track, download the MP3,
        and post it yourself. The format that travels is simple:
      </p>
      <ol>
        <li>
          <strong>Show the message in the first second.</strong> A screen
          recording of the thread, or a photo of it. Not your logo, and not the
          app.
        </li>
        <li>
          <strong>Cut straight to the chorus.</strong> The verse is context
          nobody stays for; the hook is the whole video.
        </li>
        <li>
          <strong>Put the text on screen, not in the caption.</strong> Captions
          get skimmed at best.
        </li>
      </ol>

      <h2>Why emo is the right genre for a text message</h2>
      <p>
        Texts are already confessional, already too much, already sent at the
        wrong hour. That is precisely the emotional register emo and pop punk
        were built for — the genre&apos;s whole posture is{" "}
        <em>saying the embarrassing thing at volume</em>. A soft acoustic
        treatment would make a brutal message sound wistful. A Paramore-shaped
        chorus makes it sound like it deserved a chorus.
      </p>
      <p>
        More on where the genre lines actually fall in{" "}
        <Link href="/blog/what-makes-a-song-emo">
          emo vs. pop punk, sorted out
        </Link>
        .
      </p>

      <h2>What you get back</h2>
      <ul>
        <li>
          <strong>Real sung vocals</strong> — male or female, not text-to-speech
        </li>
        <li>
          <strong>Lyrics built from your text</strong>, with verses, a chorus and
          a bridge
        </li>
        <li>
          <strong>Full production</strong> — guitars, drums, the lot
        </li>
        <li>
          <strong>A free 60-second preview</strong> before you spend anything
        </li>
        <li>
          <strong>An MP3 download</strong> with no watermark, ready to post
        </li>
      </ul>
    </GeneratorLanding>
  );
}
