import type { Metadata } from "next";
import Link from "next/link";
import BlogShell from "@/components/BlogShell";
import { getPost } from "@/lib/blog";

const post = getPost("turn-your-words-into-an-emo-song")!;

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

export default function Page() {
  return (
    <BlogShell post={post}>
      <p>
        You&apos;ve probably seen the videos: someone screenshots a brutal text
        thread, feeds it into an AI, and out comes a dramatic emo anthem with a
        screaming chorus about &quot;seen at 11:47.&quot; The &quot;turn your
        texts into an emo song&quot; trend blew up on TikTok and YouTube Shorts
        for a simple reason — it&apos;s hilarious, it&apos;s cathartic, and the
        results are weirdly good. Here&apos;s how to make your own.
      </p>

      <h2>Why turning your words into a song works so well</h2>
      <p>
        Emo has always been about turning private, messy feelings into something
        you can shout along to. Your texts, your notes app, your 2am thoughts —
        that&apos;s already raw, first-person, confessional material. It&apos;s
        basically pre-written emo lyrics. All it&apos;s missing is a chorus and a
        wall of guitars, which is exactly the part AI is good at. (More on the
        ingredients in{" "}
        <Link href="/blog/what-makes-a-song-emo">what makes a song emo</Link>.)
      </p>

      <h2>How to turn your words into an emo song</h2>
      <p>
        Open <Link href="/">Text to Emo</Link>, paste your words, pick a
        vocalist, and generate. That&apos;s the whole thing. But a few choices
        make the difference between &quot;funny once&quot; and &quot;actually
        sounds like a real band&quot;:
      </p>
      <ul>
        <li>
          <strong>Paste the realest part.</strong> The single most devastating
          line — &quot;k.&quot;, &quot;we need to talk&quot;, &quot;happy
          birthday (late)&quot; — is your hook. Lead with it.
        </li>
        <li>
          <strong>Add context in plain words.</strong> You don&apos;t have to
          write poetry. &quot;my ex texted me happy birthday a week late&quot; is
          a perfect prompt.
        </li>
        <li>
          <strong>Match the vocalist to the vibe.</strong> Try a female
          vocalist for a Paramore-style kiss-off, or a male vocalist for Fall Out
          Boy melodrama.
        </li>
      </ul>

      <h2>Great things to turn into a song</h2>
      <ul>
        <li>A text thread that ended a situationship</li>
        <li>Your most unhinged notes-app entry</li>
        <li>A voicemail you never deleted</li>
        <li>The group chat the night everything went sideways</li>
        <li>Honestly? Your to-do list. Despair is universal.</li>
      </ul>
      <p>
        Need help shaping rougher material into a real lyric? Our{" "}
        <Link href="/blog/how-to-make-an-emo-song">
          guide to making an emo song with AI
        </Link>{" "}
        covers the small tweaks that level up the output.
      </p>

      <h2>From a screenshot to a real track</h2>
      <p>
        The magic of the trend isn&apos;t just the joke — it&apos;s that you end
        up with an actual song. AI writes the verses and chorus around your
        words, performs it with real-sounding vocals, and produces it with
        guitars and drums. You can play it back, regenerate until it&apos;s
        perfect, and download it to post or send to whoever inspired it.
      </p>
      <p>
        It&apos;s free to start, so the only risk is accidentally writing a
        banger about your ex. <Link href="/">Turn your words into a song</Link>{" "}
        and see what comes out.
      </p>
    </BlogShell>
  );
}
