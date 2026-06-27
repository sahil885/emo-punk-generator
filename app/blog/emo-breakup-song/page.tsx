import type { Metadata } from "next";
import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost } from "@/lib/blog";

const post = getPost("emo-breakup-song")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://texttoemo.com/blog/${post.slug}`,
    type: "article",
  },
};

const faq: FaqItem[] = [
  {
    question: "How do I make an emo breakup song about my ex?",
    answer:
      "Open Text to Emo, type one specific detail about the breakup (a last text, a habit you miss, the night it ended), pick a male or female vocalist, and generate. The AI writes the verses and chorus and performs it as a full emo pop punk track in a couple of minutes.",
  },
  {
    question: "Is it free to make a breakup song?",
    answer:
      "Yes — you sign in and generate for free, and you hear a 60-second preview of every song. You only spend a credit (you get free ones to start) when you want to unlock the full track and download it.",
  },
  {
    question: "What should I write to get the best breakup song?",
    answer:
      "Be specific and honest. Instead of 'my ex broke my heart,' use a concrete moment like 'you left me on read for three days then sent a thumbs up.' Small, real details give the AI a sharper emotional core and a better hook.",
  },
  {
    question: "Should I pick male or female vocals for a breakup song?",
    answer:
      "Whatever matches the energy. Female vocals lean toward a Paramore or Avril Lavigne kiss-off; male vocals lean toward Fall Out Boy or My Chemical Romance melodrama. If you can't decide, generate one of each from the same words and compare.",
  },
  {
    question: "Can I post my breakup song on TikTok or send it to my ex?",
    answer:
      "Yes — once you unlock a song it's yours to download and share on TikTok, Instagram, or anywhere else. Whether you actually send it to your ex is between you and your group chat.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        Here&apos;s a fact about emo: the entire genre basically exists to deal
        with breakups. Heartbreak, the 2am spiral, the playlist you can&apos;t
        stop playing — that&apos;s the raw material emo was built on. So when a
        relationship ends, you don&apos;t have to just sit with it. You can turn
        it into a song with a chorus you can scream in the car.
      </p>
      <p>
        This guide walks through how to make an emo breakup song about your ex
        with AI — what to write, how to make it land, and how to go from a fresh
        heartbreak to a finished anthem in a few minutes, no instruments
        required.
      </p>

      <h2>Why a breakup is the perfect emo song</h2>
      <p>
        Emo lyrics are confessional and first-person by nature — diary entries
        set to loud guitars. A breakup hands you all of that for free: the
        specific memories, the unsent texts, the things you only admit at night.
        It&apos;s pre-written emo material; all it&apos;s missing is a hook and a
        wall of sound, which is exactly the part the AI handles. (If you want the
        why behind the sound, see{" "}
        <Link href="/blog/what-makes-a-song-emo">what makes a song emo</Link>.)
      </p>

      <h2>How to make an emo breakup song in 3 steps</h2>
      <h3>1. Start with the most specific, most painful detail</h3>
      <p>
        Don&apos;t write &quot;my ex broke my heart&quot; — that&apos;s a topic,
        not a song. Write the <em>moment</em>: &quot;your hoodie still smells
        like you,&quot; &quot;you texted happy birthday a week late,&quot;
        &quot;I still drive past your street.&quot; The smaller and more real the
        detail, the harder the song hits. This is the single biggest lever you
        have — more on it in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">
          how to write emo lyrics
        </Link>
        .
      </p>
      <h3>2. Pick a vocalist and generate</h3>
      <p>
        On <Link href="/">Text to Emo</Link>, choose a female vocalist for a
        defiant Paramore-style kiss-off, or a male vocalist for Fall Out
        Boy–style melodrama. Hit generate and the AI writes a full structure —
        verse, pre-chorus, anthemic chorus, bridge — and performs it with
        guitars, drums, and vocals.
      </p>
      <h3>3. Preview, regenerate, and unlock the one that hurts</h3>
      <p>
        You&apos;ll hear a 60-second preview of each version. Tweak the words and
        run it again — small changes shift the imagery and the hook. When one
        genuinely gives you chills, unlock the full track and download it.
      </p>

      <h2>What to feed it: breakup song prompt ideas</h2>
      <p>
        Stuck staring at the box? Steal one of these, or use them as a template:
      </p>
      <ul>
        <li>&quot;You left me on read for three days, then sent a thumbs up&quot;</li>
        <li>&quot;I kept the playlist you made me and I still can&apos;t delete it&quot;</li>
        <li>&quot;Your side of the bed is still cold and I hate that I noticed&quot;</li>
        <li>&quot;We said forever in a parking lot at 2am&quot;</li>
        <li>&quot;I&apos;m fine, I&apos;m fine, I&apos;m fine (I&apos;m not)&quot;</li>
      </ul>
      <p>
        Notice the pattern: a concrete object or moment paired with a big
        feeling. That contrast is what the AI turns into a verse and a chorus.
      </p>

      <h2>Two kinds of breakup song</h2>
      <p>
        Decide which one you&apos;re making — it changes everything about the
        tone:
      </p>
      <ul>
        <li>
          <strong>The heartbreak ballad.</strong> Slower, sadder, the &quot;I
          still miss you&quot; song. Lean into vulnerable, specific lines and let
          the chorus ache.
        </li>
        <li>
          <strong>The kiss-off anthem.</strong> Fast, defiant, the &quot;I&apos;m
          better off&quot; song. Sharper lines, more attitude — this is the one
          that goes viral on TikTok.
        </li>
      </ul>
      <p>
        Not sure? Make both from the same breakup and see which one feels truer.
      </p>

      <h2>Make it sound real, not generic</h2>
      <ul>
        <li>
          <strong>Confess, don&apos;t explain.</strong> &quot;I&apos;m fine&quot;
          repeated unconvincingly beats a paragraph of backstory.
        </li>
        <li>
          <strong>Name real things.</strong> The street, the hoodie, the
          playlist, the exact time. Concrete nouns are what make a lyric stick.
        </li>
        <li>
          <strong>Regenerate.</strong> The third or fourth version is usually the
          keeper — it&apos;s free creative dice-rolling.
        </li>
      </ul>
      <p>
        The same trick that powers the viral{" "}
        <Link href="/blog/turn-your-words-into-an-emo-song">
          turn-your-texts-into-a-song
        </Link>{" "}
        trend works perfectly here: paste the realest line and let the AI build
        the anthem around it.
      </p>

      <h2>Turn the heartbreak into a hook</h2>
      <p>
        The best part of making a breakup song isn&apos;t revenge — it&apos;s
        that you walk away with an actual track instead of just a bad week. Type
        the thing you can&apos;t stop thinking about,{" "}
        <Link href="/">open the generator</Link>, and let the quiet-verse,
        loud-chorus, minor-key formula do the rest. Your first songs are free.
      </p>
    </BlogShell>
  );
}
