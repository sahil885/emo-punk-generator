import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost, postMetadata } from "@/lib/blog";

const post = getPost("how-to-make-a-sad-song-with-ai")!;

export const metadata = postMetadata(post);

const faq: FaqItem[] = [
  {
    question: "Can AI really make a sad song that sounds good?",
    answer:
      "Yes. On Text to Emo, Claude writes the lyrics from whatever you type and Suno performs them as a full emo pop punk track — real vocals, guitars, drums, and a chorus built around your words. It's a finished song, not a moody background loop.",
  },
  {
    question: "How do I make a sad song about someone specific?",
    answer:
      "Type one true detail about them — the last thing they said, the seat they always took, the text you never answered — pick a male or female vocalist, and generate. The more specific the detail, the sadder and more personal the song feels.",
  },
  {
    question: "Is making a sad song with AI free?",
    answer:
      "Generating is free after you sign in, and you hear a 60-second preview of every song. Unlocking and downloading the full track uses credits, and new accounts start with free songs — so your first sad songs cost nothing.",
  },
  {
    question: "Should I pick male or female vocals for a sad song?",
    answer:
      "Female vocals lean toward a Paramore or PVRIS ache; male vocals lean toward My Chemical Romance or Fall Out Boy melodrama. If you're torn, generate one of each from the same words and keep whichever one gives you chills.",
  },
  {
    question: "Can I share my sad song on TikTok?",
    answer:
      "Yes — once you unlock a song it's yours to download and post on TikTok, Instagram, or anywhere else. Sad, hyper-specific songs are exactly the kind of thing that ends up in everyone else's 2am feed.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        If you want to make a sad song with AI, you have two options. Option
        one: a generic &quot;sad music generator&quot; that hands you ninety
        seconds of rainy-day piano with no words, no voice, and no idea what
        you&apos;re actually sad about. Option two: type the thing that&apos;s
        been sitting in your chest all week and get a full song — lyrics,
        vocals, guitars, a chorus — that&apos;s sad <em>about something</em>.
        This guide is about option two.
      </p>
      <p>
        On <Link href="/">Text to Emo</Link>, Claude writes the lyrics from
        your words and Suno performs them, so the sadness in the song is yours,
        not a stock mood. Here&apos;s how to do it, what to type, and why the
        specific hurt always beats the vague one.
      </p>

      <h2>What actually makes a song sound sad</h2>
      <p>
        Before you type anything, it helps to know what you&apos;re asking the
        AI for. Sad songs lean on a few reliable moves: minor keys, tempos slow
        enough to leave space between the lines, verses that hold back so the
        chorus can break open, and — the big one — lyrics that confess instead
        of explain. Emo turned that recipe into an entire genre, which is why an
        emo pop punk track is the natural shape for a sad song: it&apos;s
        allowed to be dramatic, specific, and a little too honest.
      </p>
      <p>
        The part you control is the words. The AI handles the minor keys and
        the dynamics; your job is to hand it a real feeling with a name, a
        place, or a timestamp attached.
      </p>

      <h2>How to make a sad song with AI in 3 steps</h2>
      <h3>1. Type the thing you keep not saying</h3>
      <p>
        Skip &quot;write a sad song.&quot; That gets you wallpaper. Instead,
        give it the actual artifact of the sadness: the unsent text, the empty
        chair, the voicemail you can&apos;t delete, the friend who slowly
        stopped calling. One honest sentence is enough — the AI builds verses,
        a pre-chorus, and a hook around it.
      </p>
      <h3>2. Pick your vocalist</h3>
      <p>
        Choose a female vocalist for a Paramore or PVRIS-style ache, or a male
        vocalist for My Chemical Romance-grade melodrama. Same words, two very
        different kinds of sad — quiet devastation versus operatic heartbreak.
        There&apos;s no wrong answer, and generating one of each is a
        completely valid strategy.
      </p>
      <h3>3. Preview, tweak, and unlock the one that stings</h3>
      <p>
        Every song comes with a free 60-second preview. If the first version is
        sad-ish but not <em>your</em> sad, change a detail and regenerate —
        swap &quot;I miss you&quot; for the street name, the hoodie, the exact
        hour. When a version genuinely gets you, unlock it and download the
        full track. Your first songs are free.
      </p>

      <h2>Sad song ideas: what to type when you&apos;re stuck</h2>
      <p>
        The formula is simple: one concrete detail plus one big feeling. Steal
        any of these and make them yours:
      </p>
      <ul>
        <li>&quot;You still watch my stories but you never text back&quot;</li>
        <li>&quot;The group chat went quiet after you left town&quot;</li>
        <li>&quot;I drove past our old apartment and the lights were on&quot;</li>
        <li>&quot;My best friend and I just... stopped, and nobody said why&quot;</li>
        <li>&quot;I&apos;m homesick for a summer that&apos;s never coming back&quot;</li>
        <li>&quot;You said &apos;see you soon&apos; and that was three years ago&quot;</li>
      </ul>
      <p>
        Notice none of these say the word &quot;sad.&quot; They point at a
        specific ache and let the song do the naming. That&apos;s the whole
        trick — more on the craft side in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">
          how to write emo lyrics
        </Link>
        .
      </p>

      <h2>Pick your flavor of sad</h2>
      <p>
        &quot;Sad&quot; is a genre with subgenres. Deciding which one
        you&apos;re making changes the words you should type:
      </p>
      <ul>
        <li>
          <strong>The heartbreak song.</strong> The classic. If someone broke
          it, we have a whole field guide to{" "}
          <Link href="/blog/emo-breakup-song">
            making an emo breakup song about your ex
          </Link>
          .
        </li>
        <li>
          <strong>The missing-someone song.</strong> A friend who moved, a
          person who faded, someone you can&apos;t call anymore. Lead with the
          thing of theirs you still have.
        </li>
        <li>
          <strong>The nostalgia song.</strong> Sad about a time, not a person —
          the last summer before everyone scattered. Name the year and the
          place.
        </li>
        <li>
          <strong>The slow build.</strong> If you want the whispered first
          verse and the chorus that levels you, aim it at ballad territory —
          here&apos;s{" "}
          <Link href="/blog/what-makes-a-great-emo-ballad">
            what makes a great emo ballad
          </Link>{" "}
          work.
        </li>
      </ul>

      <h2>Why your words beat a &quot;sad music&quot; generator</h2>
      <p>
        Instrumental mood generators are fine for video background music. But a
        sad <em>song</em> needs a voice saying something true, because
        that&apos;s the part that makes your throat tighten. A minor-key loop
        can&apos;t mention the hoodie. A vocalist singing your exact 2am
        thought can. That&apos;s also why these songs travel — a
        hyper-specific sad song sent to the group chat or posted to TikTok hits
        people in a way that &quot;melancholic ambient track #4&quot; never
        will.
      </p>
      <p>
        And there&apos;s a real reason to make one beyond the song itself:
        putting the feeling into words that rhyme, build, and resolve is
        weirdly relieving. Emo figured that out decades ago. You&apos;re just
        doing it with better turnaround time.
      </p>

      <h2>Turn the bad week into a track</h2>
      <p>
        You don&apos;t need instruments, production skills, or the emotional
        distance of a songwriter — just the sentence you keep almost sending.{" "}
        <Link href="/">Open the generator</Link>, type it, pick a voice, and in
        a couple of minutes the worst part of your week has a chorus. Sing
        along in the car at full volume. That&apos;s what it&apos;s for.
      </p>
    </BlogShell>
  );
}
