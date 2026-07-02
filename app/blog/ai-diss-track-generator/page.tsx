import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost, postMetadata } from "@/lib/blog";

const post = getPost("ai-diss-track-generator")!;

export const metadata = postMetadata(post);

const faq: FaqItem[] = [
  {
    question: "How do I make a diss track with AI?",
    answer:
      "Open Text to Emo, type who the diss is about and what they did (the more specific, the sharper), pick a male or female vocalist, and generate. The AI writes the verses and a roast of a chorus and performs it as a full pop punk track in a couple of minutes.",
  },
  {
    question: "Is this a rap diss track generator?",
    answer:
      "No — and that's the point. Most diss track generators spit rap bars. Text to Emo makes a sung, anthemic pop punk / emo diss track with guitars and a big chorus, which stands out and lands better on TikTok.",
  },
  {
    question: "Is it free to make a diss track?",
    answer:
      "Yes — sign in and generate for free, with a 60-second preview of every track. You only spend a credit (you get free ones to start) to unlock the full song and download it.",
  },
  {
    question: "What should I write for the best diss track?",
    answer:
      "Specific beats generic every time. Instead of 'my ex is the worst,' name the real thing: 'you returned my hoodie with someone else's hair on it.' Concrete callouts give the AI sharper bars and a funnier, harder-hitting hook.",
  },
  {
    question: "Can I post my diss track or send it to the person?",
    answer:
      "Once you unlock a track it's yours to download and post on TikTok, Instagram, or anywhere. Keep it clever rather than cruel, and use good judgment about targeting real people — a roast that's funny ages a lot better than one that's just mean.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        Somebody did you dirty. The classic move is to vent in the group chat.
        The better move? Turn it into a diss track with a chorus so catchy they
        can&apos;t even be mad. Here&apos;s how to make one with AI in a couple of
        minutes — no studio, no rapping required.
      </p>

      <h2>The twist: a pop punk diss track, not a rap one</h2>
      <p>
        Search &quot;AI diss track generator&quot; and you&apos;ll find a dozen
        tools that spit rap battle bars. They&apos;re fine — but they all sound
        the same, and a rap diss is a crowded lane. Text to Emo does something
        different: a <strong>sung, anthemic pop punk / emo diss track</strong> —
        guitars, drums, and a shout-along chorus. Think a kiss-off in the style of
        Paramore or Fall Out Boy rather than a freestyle. It stands out, and that
        contrast is exactly why it pops on TikTok.
      </p>

      <h2>How to make a diss track with AI in 3 steps</h2>
      <h3>1. Name the target and the crime — specifically</h3>
      <p>
        &quot;My ex sucks&quot; gives the AI nothing. &quot;You said you were
        busy and posted a story from the bar&quot; gives it a hook. The more
        concrete the callout — the exact lie, the petty receipt, the
        screenshot-able moment — the sharper the bars. Specificity is the whole
        game, the same way it is in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">writing emo lyrics</Link>.
      </p>
      <h3>2. Pick a vocalist and generate</h3>
      <p>
        On <Link href="/">Text to Emo</Link>, choose a female vocalist for a
        venomous, melodic Paramore-style takedown, or a male vocalist for cocky
        Fall Out Boy energy. Hit generate and the AI writes a full song — verse,
        pre-chorus, roast of a chorus, bridge — and performs it with a band.
      </p>
      <h3>3. Preview, regenerate, and unlock the meanest one</h3>
      <p>
        You&apos;ll hear a 60-second preview of each take. Re-run it a few times —
        the phrasing and punchlines shift each round, so the third or fourth
        version is usually the one that makes you laugh out loud. Unlock that one
        and download it.
      </p>

      <h2>What makes a diss track actually hit</h2>
      <ul>
        <li>
          <strong>Funny &gt; furious.</strong> The roasts that go viral are clever,
          not just angry. Aim for the line that makes people rewind.
        </li>
        <li>
          <strong>Use real receipts.</strong> Specific, true details land harder
          than insults. Pettiness is a feature here.
        </li>
        <li>
          <strong>Make the chorus the burn.</strong> Put your single best line in
          the chorus so it repeats and sticks.
        </li>
        <li>
          <strong>Keep it clever, not cruel.</strong> A roast that&apos;s witty
          ages well; one that&apos;s just mean doesn&apos;t. Punch with style.
        </li>
      </ul>

      <h2>Good things to make a diss track about</h2>
      <ul>
        <li>An ex who did you wrong (the eternal classic)</li>
        <li>The friend who never Venmos you back</li>
        <li>Your group project teammate who did nothing</li>
        <li>A situationship that ghosted, then liked your post</li>
        <li>Honestly, yourself, six months ago. Self-roasts go hard.</li>
      </ul>
      <p>
        It&apos;s the same engine behind the viral{" "}
        <Link href="/blog/turn-your-words-into-an-emo-song">
          turn-your-texts-into-a-song
        </Link>{" "}
        trend — paste the realest receipt and let the AI build the anthem around
        it.
      </p>

      <h2>From group-chat rant to actual banger</h2>
      <p>
        The point isn&apos;t revenge — it&apos;s that you walk away with a real
        track instead of just a bad mood. Type who wronged you and what they did,{" "}
        <Link href="/">open the generator</Link>, and let the guitars do the
        roasting. Your first songs are free, so the only risk is making a diss so
        catchy you accidentally write a hit.
      </p>
    </BlogShell>
  );
}
