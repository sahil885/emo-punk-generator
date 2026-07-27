import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost, postMetadata } from "@/lib/blog";

const post = getPost("make-a-song-about-someone")!;

export const metadata = postMetadata(post);

const faq: FaqItem[] = [
  {
    question: "How do I make a song about someone with AI?",
    answer:
      "Open Text to Emo, type one true detail about the person — what they said, what they did, the thing you can't stop replaying — then pick a male or female vocalist and generate. Claude writes the lyrics from your words and Suno performs them as a full emo pop punk track with vocals, guitars, and drums in a couple of minutes.",
  },
  {
    question: "Can I make a song about someone for free?",
    answer:
      "Generating is free once you sign in, and every song comes with a 60-second preview you can listen to before deciding. Unlocking and downloading the full track uses credits, and new accounts start with free songs — so your first few songs about someone cost nothing.",
  },
  {
    question: "Can I use the person's actual name in the song?",
    answer:
      "You can type whatever you want, including a name, and the lyrics will be built from it. Most people find the song hits harder with details than with names — the hoodie, the last text, the street — because that's what makes listeners feel it. If you're posting to TikTok, unnamed and hyper-specific is usually the better move.",
  },
  {
    question: "What if the song is about someone I'm mad at?",
    answer:
      "Then you're making a diss track, and pop punk is a great genre for it. Type what they did, pick a vocalist with enough attitude, and let the chorus do the yelling. Our guide to making an AI diss track covers how to keep it funny and sharp instead of just mean.",
  },
  {
    question: "Should I pick male or female vocals for a song about a person?",
    answer:
      "It depends on the feeling more than the person. Female vocals lean Paramore, PVRIS, or Avril Lavigne — sharper, more wounded. Male vocals lean Fall Out Boy, Green Day, or My Chemical Romance — bigger and more theatrical. Generate one of each from the same words and keep the one that makes you sit up.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        Everyone has one person they could write a whole album about. To make a
        song about someone, you used to need a guitar, three chords, and the
        nerve to play it out loud. Now you need one honest sentence. Type the
        detail you can&apos;t stop thinking about — what they said, what they
        stopped saying, the thing they left at your place — and get back a full
        emo pop punk track with lyrics, vocals, and a chorus, in about the time
        it takes to reread the conversation again.
      </p>
      <p>
        On <Link href="/">Text to Emo</Link>, Claude writes the lyrics from your
        words and Suno performs them, so the song is about your specific person,
        not a generic someone. Here&apos;s how to do it, what to type, and how to
        avoid the mistake that makes AI songs sound like a greeting card.
      </p>

      <h2>Why one person makes a better song than one feeling</h2>
      <p>
        &quot;Write a song about heartbreak&quot; gets you a song about nothing.
        &quot;Write a song about the person who still watches every story and
        never replies&quot; gets you a song. A named target — even an unnamed
        specific one — gives the lyrics something to point at: a face, a habit, a
        room they were in.
      </p>
      <p>
        This is the oldest trick in songwriting and emo built an entire genre on
        it. The confessional first person, aimed at exactly one listener who
        may never hear it. You&apos;re not describing an emotion; you&apos;re
        talking to somebody. That shift alone makes the difference between a mood
        and a track.
      </p>

      <h2>How to make a song about someone in 3 steps</h2>
      <h3>1. Pick the one detail, not the whole relationship</h3>
      <p>
        Resist the urge to summarize. You don&apos;t need to explain how you met,
        what went wrong, and how you feel now — you need <em>one</em> image. The
        hoodie in the back of your closet. The coffee order you memorized. The
        text at 2:41am that said &quot;never mind.&quot; The seat they always
        took. Small and concrete beats big and vague every single time, and the
        AI expands it into verses, a pre-chorus, and a hook.
      </p>
      <h3>2. Pick a vocalist that matches the feeling</h3>
      <p>
        Choose a female vocalist for a Paramore, PVRIS, or Avril Lavigne edge —
        sharper, more wounded, more likely to sound like a warning. Choose a male
        vocalist for Fall Out Boy, Green Day, or My Chemical Romance energy —
        bigger, more theatrical, more likely to sound like a stadium apology.
        Same words, two totally different songs about the same person.
      </p>
      <h3>3. Preview, regenerate, and unlock the one that lands</h3>
      <p>
        You get a free 60-second preview of every version. If the first one
        is close but not quite them, change a detail and run it again — swapping
        one line rewrites the imagery and the chorus. When a version makes you
        put your hand over your mouth, unlock it and download the full track.
        Your first songs are free, so regenerating is just free dice-rolling.
      </p>

      <h2>Who are you writing about? Pick your angle</h2>
      <p>
        &quot;Someone&quot; covers a lot of ground, and the person changes the
        shape of the song. Figure out which one you&apos;re making before you
        type:
      </p>
      <ul>
        <li>
          <strong>An ex.</strong> The genre&apos;s home turf. Regret, rage,
          nostalgia, or all three — the full playbook is in{" "}
          <Link href="/blog/emo-breakup-song">
            how to make an emo breakup song about your ex
          </Link>
          .
        </li>
        <li>
          <strong>A crush.</strong> The song you&apos;ll never send, which is
          somehow more emo than heartbreak. See{" "}
          <Link href="/blog/song-for-your-crush">
            how to make a song for your crush
          </Link>
          .
        </li>
        <li>
          <strong>Someone you&apos;re furious with.</strong> A sung, anthemic
          roast beats a rap verse for most people — that&apos;s a{" "}
          <Link href="/blog/ai-diss-track-generator">pop punk diss track</Link>.
        </li>
        <li>
          <strong>A best friend.</strong> Underrated and devastating. The friend
          who moved, the friendship that quietly ended, or the one who has stayed
          through everything — friendship songs wreck people precisely because
          nobody expects them.
        </li>
        <li>
          <strong>Someone you lost.</strong> Handle with care and keep it
          concrete: their laugh, their car, the last normal Tuesday.
        </li>
        <li>
          <strong>Yourself, honestly.</strong> Plenty of songs about
          &quot;someone&quot; turn out to be about the person writing them. Emo
          has always known this.
        </li>
      </ul>

      <h2>What to type: prompts you can steal</h2>
      <p>
        The formula is one specific detail plus one big feeling. Take any of
        these and swap in your own facts:
      </p>
      <ul>
        <li>&quot;You still have my hoodie and I still haven&apos;t asked&quot;</li>
        <li>&quot;You told everyone your version first&quot;</li>
        <li>&quot;You were the only one who showed up and I never said thanks&quot;</li>
        <li>&quot;I learned your coffee order and you forgot my birthday&quot;</li>
        <li>&quot;You moved four hours away and the group chat died&quot;</li>
        <li>&quot;You typed for a full minute and sent &apos;k&apos;&quot;</li>
      </ul>
      <p>
        Notice that none of them explain the relationship. They drop you into one
        moment and let the song fill in the rest. If you want to go deeper on the
        craft of it, read{" "}
        <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>{" "}
        — the same instincts apply whether a human or an AI is doing the drafting.
      </p>

      <h2>Three mistakes that make the song sound generic</h2>
      <ul>
        <li>
          <strong>Adjectives instead of nouns.</strong> &quot;She was
          amazing&quot; is a review. &quot;She always drove with the windows down
          in November&quot; is a lyric. Concrete nouns carry emotion; adjectives
          just announce it.
        </li>
        <li>
          <strong>Trying to be fair.</strong> Songs are not court testimony. You
          are allowed to be dramatic and one-sided — that&apos;s the entire
          appeal of the genre. Balance is for the group chat.
        </li>
        <li>
          <strong>Stopping at the first version.</strong> The third or fourth
          generation is usually the keeper. Change one detail, not the whole
          prompt, and see how much the chorus moves.
        </li>
      </ul>

      <h2>Sending it, posting it, or keeping it</h2>
      <p>
        Once you unlock a track it&apos;s yours to download and do whatever you
        want with. Some people send it directly to the person, which is a bold
        move with a wide range of outcomes. Some post it to TikTok or Instagram
        with the caption &quot;made a song about my ex,&quot; which is how half
        these songs end up in strangers&apos; feeds — hyper-specific songs travel
        because everyone recognizes their own version of that person. And some
        people never share it at all, which is completely valid. The point was
        getting it out of your head and into a chorus.
      </p>

      <h2>Turn the person into a track</h2>
      <p>
        You don&apos;t need a band, a studio, or permission. You need the one
        detail you keep replaying. <Link href="/">Open the generator</Link>, type
        it, pick a voice, and give the person in your head a soundtrack instead
        of a running commentary. Your first songs are free — start with the one
        you&apos;ve been mentally writing for months.
      </p>
    </BlogShell>
  );
}
