import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost, postMetadata } from "@/lib/blog";

const post = getPost("song-for-your-crush")!;

export const metadata = postMetadata(post);

const faq: FaqItem[] = [
  {
    question: "How do I make a song for my crush?",
    answer:
      "Open Text to Emo, type one honest detail about them or the way they make you feel (a specific moment, a text you almost sent, the thing you can't stop noticing), pick a male or female vocalist, and generate. The AI writes the verses and chorus and performs it as a full emo pop punk track in a couple of minutes — no instruments needed.",
  },
  {
    question: "Is it free to make a crush song?",
    answer:
      "Yes — you sign in and generate for free, and you hear a 60-second preview of every version. You only spend a credit (new accounts get free ones to start) when you want to unlock the full track and download it to keep or share.",
  },
  {
    question: "What should I write in a song about my crush?",
    answer:
      "Skip 'they're perfect' and name something real: the way they laugh at their own jokes, the seat you always try to sit near, the three dots that appear and disappear. One small, specific detail gives the AI a sharper emotional core and a chorus that actually lands.",
  },
  {
    question: "Should I pick male or female vocals for a crush song?",
    answer:
      "Whatever fits the feeling. Female vocals lean toward a Paramore or Avril Lavigne kind of longing; male vocals lean toward Fall Out Boy or My Chemical Romance yearning. Can't decide? Generate one of each from the same words and see which one gives you butterflies.",
  },
  {
    question: "Do I actually have to send it to my crush?",
    answer:
      "Not even a little. Plenty of people make a crush song just to get the feeling out of their head — and half the fun is that you never send it. But once you unlock a track it's yours to download and post to TikTok or Instagram, with or without naming names.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        There&apos;s a very specific kind of crazy that a crush turns you into:
        rereading a two-word text like it&apos;s poetry, rehearsing conversations
        that will never happen, hearing one song and thinking <em>oh no, this is
        about them now</em>. The most emo thing you can do with all that? Make a
        song for your crush. Not to necessarily send — just to turn the
        2am spiral into something with a chorus. This guide walks through how to
        make a song for your crush with AI, from a single honest detail to a
        finished pop-punk track in a few minutes, no band required.
      </p>
      <p>
        Emo and pop punk have basically always been crush music. Half the genre
        is people yelling about someone who doesn&apos;t know they exist. So a
        crush is perfect raw material — and the AI handles the part you can&apos;t
        (the hook, the guitars, the voice that actually sings it).
      </p>

      <h2>Why a crush is the most emo song you can write</h2>
      <p>
        Breakup songs get all the attention, but a crush is arguably <em>more</em>{" "}
        emo. Heartbreak is about something that happened; a crush is about
        something that hasn&apos;t — the longing, the maybe, the entire imaginary
        relationship you&apos;ve built out of eye contact and a shared playlist.
        That ache of <em>almost</em> is exactly the confessional, first-person
        feeling emo was built to scream about. (If you want the flip side, the{" "}
        <Link href="/blog/emo-breakup-song">emo breakup song</Link> guide covers
        what happens when the crush actually becomes something and then ends.)
      </p>
      <p>
        The trick is that a great crush song isn&apos;t sweet and vague — it&apos;s
        specific and slightly unhinged in the most relatable way. Which is good
        news, because specific is exactly what makes AI-written lyrics stop
        sounding like a greeting card.
      </p>

      <h2>How to make a song for your crush in 3 steps</h2>
      <h3>1. Start with the detail you&apos;d never say out loud</h3>
      <p>
        Don&apos;t write &quot;I have a crush on you&quot; — that&apos;s a status,
        not a song. Write the <em>moment</em>: &quot;you saved me the seat again
        and I&apos;ve thought about it all week,&quot; &quot;you replied at 1am and
        I&apos;m pretending that means something,&quot; &quot;I laughed too hard at
        your joke and I think you noticed.&quot; The smaller and more embarrassing
        the detail, the harder the song hits. This is the single biggest lever you
        have — there&apos;s more on it in{" "}
        <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>.
      </p>
      <h3>2. Pick a vocalist and generate</h3>
      <p>
        On <Link href="/">Text to Emo</Link>, choose a female vocalist for a
        wistful, Paramore-style longing, or a male vocalist for Fall Out Boy–style
        overthinking-set-to-guitars. Hit generate and the AI writes a full
        structure — verse, pre-chorus, big anthemic chorus, bridge — and performs
        it with drums, guitars, and real vocals. You&apos;re not writing sheet
        music; you&apos;re dropping a feeling and getting a song back.
      </p>
      <h3>3. Preview, regenerate, and decide if you&apos;ll ever send it</h3>
      <p>
        You&apos;ll hear a 60-second preview of each version. Tweak the words and
        run it again — nudging one line changes the imagery and the hook. When one
        version genuinely gives you butterflies (or secondhand embarrassment, same
        thing), unlock the full track and download it. Whether it becomes a private
        voice-note-to-self or a TikTok you post at 11:59pm is entirely up to you.
      </p>

      <h2>Crush song prompt ideas to steal</h2>
      <p>
        Staring at the box with a blank mind and a racing heart? Steal one of
        these, or use them as a template and swap in your own details:
      </p>
      <ul>
        <li>&quot;You have no idea, and that&apos;s the whole problem&quot;</li>
        <li>&quot;I memorized your coffee order like it means something&quot;</li>
        <li>&quot;Left on read but I&apos;d do it all again&quot;</li>
        <li>&quot;You said we&apos;re just friends and I said yeah, totally&quot;</li>
        <li>&quot;Every song is about you now and I&apos;m furious about it&quot;</li>
        <li>&quot;I typed it out, deleted it, typed it again&quot;</li>
      </ul>
      <p>
        Notice the pattern: a concrete, slightly humiliating specific paired with a
        big feeling. That contrast — small detail, huge emotion — is exactly what
        the AI turns into a verse and a chorus. It&apos;s the same engine behind the
        viral{" "}
        <Link href="/blog/turn-your-words-into-an-emo-song">
          turn-your-texts-into-a-song
        </Link>{" "}
        trend: paste the realest line and let it build the anthem around it.
      </p>

      <h2>Three kinds of crush song</h2>
      <p>
        Decide which one you&apos;re making before you generate — it changes the
        whole tone:
      </p>
      <ul>
        <li>
          <strong>The confession.</strong> Big, hopeful, all-in — the &quot;I have
          to tell you&quot; song. Lean into the chorus and let it be earnest. This
          is the one you might actually send.
        </li>
        <li>
          <strong>The pining ballad.</strong> Slower, aching, the &quot;you&apos;ll
          never know&quot; song. Vulnerable, specific, quiet verses that build. If
          you want this one to really land, read{" "}
          <Link href="/blog/what-makes-a-great-emo-ballad">
            what makes a great emo ballad
          </Link>
          .
        </li>
        <li>
          <strong>The &quot;we&apos;re just friends&quot; anthem.</strong> Fast,
          a little bitter, a lot funny — the song about being stuck in the friend
          zone and dramatizing it into pop-punk. This is the one that goes viral.
        </li>
      </ul>
      <p>
        Not sure which fits? Make all three from the same crush and see which one
        feels the most true (and the least survivable).
      </p>

      <h2>Make it sound real, not like a greeting card</h2>
      <ul>
        <li>
          <strong>Confess, don&apos;t compliment.</strong> &quot;Your eyes are
          beautiful&quot; is a Hallmark card. &quot;I looked away first and
          regretted it for a week&quot; is a lyric.
        </li>
        <li>
          <strong>Name real things.</strong> The seat, the coffee order, the exact
          time they replied, the hoodie you keep hoping they&apos;ll notice.
          Concrete nouns are what make a line stick.
        </li>
        <li>
          <strong>Let it be a little embarrassing.</strong> The unflattering,
          too-honest detail is the good part. Cringe is just sincerity that
          hasn&apos;t been edited down.
        </li>
        <li>
          <strong>Regenerate.</strong> The third or fourth version is usually the
          keeper — it&apos;s free creative dice-rolling, so roll again.
        </li>
      </ul>

      <h2>Write the song you&apos;ll never send</h2>
      <p>
        The best part of making a crush song isn&apos;t confessing — it&apos;s that
        you walk away with an actual track instead of just a feeling you&apos;ve
        been carrying around for three weeks. Type the thing you can&apos;t stop
        thinking about,{" "}
        <Link href="/">open the generator</Link>, pick a voice, and let the
        quiet-verse, loud-chorus, minor-key formula do the rest. Send it, post it,
        or keep it forever in your drafts. Your first songs are free.
      </p>
    </BlogShell>
  );
}
