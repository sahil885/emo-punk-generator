import type { Metadata } from "next";
import Link from "next/link";
import BlogShell from "@/components/BlogShell";
import { getPost } from "@/lib/blog";

const post = getPost("what-makes-a-song-emo")!;

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
        &quot;Emo&quot; gets used for everything from My Chemical Romance to a sad
        TikTok sound, so it&apos;s worth pinning down: what actually makes a song
        emo? Short answer — it&apos;s a mix of <strong>sound</strong> and{" "}
        <strong>sincerity</strong>. Emo takes the energy of punk rock and points
        it inward, at heartbreak, anxiety, and the stuff you&apos;d only admit at
        2am.
      </p>

      <h2>Where emo comes from</h2>
      <p>
        Emo is short for &quot;emotional hardcore,&quot; a punk offshoot that
        started in the mid-1980s. Over the decades it split into waves — the
        raw early scene, the 2000s mainstream explosion (Fall Out Boy, My
        Chemical Romance, Paramore), and today&apos;s emo revival. Across all of
        them, the throughline is the same: punk&apos;s intensity aimed at
        personal, confessional feelings rather than the outside world.
      </p>

      <h2>The musical ingredients</h2>
      <p>A song tends to read as emo when it has some combination of:</p>
      <ul>
        <li>
          <strong>Quiet-loud dynamics.</strong> Restrained, almost-whispered
          verses that detonate into huge choruses. That contrast is the
          emotional payoff.
        </li>
        <li>
          <strong>Minor keys and tension.</strong> Melancholy chord choices and
          unresolved progressions that keep a knot in your chest.
        </li>
        <li>
          <strong>Expressive, imperfect vocals.</strong> Cracks, strain, and the
          occasional shout — delivery that sounds like it <em>means</em> it.
        </li>
        <li>
          <strong>Guitar-driven arrangements.</strong> Interlocking riffs and
          melodic lead lines over a punk-rooted rhythm section.
        </li>
      </ul>

      <h2>The lyrical ingredients</h2>
      <p>
        This is where emo really separates itself. The lyrics are{" "}
        <strong>confessional and first-person</strong>: heartbreak, isolation,
        self-doubt, and the search for meaning, delivered like a diary entry set
        to music. Specificity is everything — the best emo lyrics name the exact
        streetlight, the exact text, the exact room. If you want to write some,
        we cover it in{" "}
        <Link href="/blog/how-to-make-an-emo-song">
          how to make an emo song with AI
        </Link>
        .
      </p>

      <h2>Emo vs. pop punk: what&apos;s the difference?</h2>
      <p>
        They&apos;re cousins and they overlap constantly, but the feel is
        different:
      </p>
      <ul>
        <li>
          <strong>Pop punk</strong> is brighter and faster — catchy hooks,
          sing-along choruses, and lighter themes like youth, rebellion, and
          summer. Think Green Day and blink-182.
        </li>
        <li>
          <strong>Emo</strong> uses those same big choruses but carries more
          emotional weight, leaning melancholic and introspective. Think early
          Paramore and My Chemical Romance.
        </li>
      </ul>
      <p>
        In practice most modern &quot;emo&quot; songs are really emo-pop or
        pop-punk hybrids — which is exactly the sweet spot{" "}
        <Link href="/">Text to Emo</Link> aims for: anthemic enough to shout,
        sad enough to mean it.
      </p>

      <h2>So, is your idea emo?</h2>
      <p>
        If it&apos;s a real, specific feeling and you can imagine screaming it in
        a chorus, it&apos;s emo. The quickest way to find out is to hear it:{" "}
        <Link href="/blog/turn-your-words-into-an-emo-song">
          turn your own words into an emo song
        </Link>{" "}
        and let the quiet-loud, minor-key, confessional formula do its thing.
      </p>
    </BlogShell>
  );
}
