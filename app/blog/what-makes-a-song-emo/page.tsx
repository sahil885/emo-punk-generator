import type { Metadata } from "next";
import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
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

const faq: FaqItem[] = [
  {
    question: "What does 'emo' stand for?",
    answer:
      "Emo is short for 'emotional hardcore' (sometimes 'emocore'), a subgenre of punk rock that emerged in the mid-1980s. The name points to its defining trait: punk energy aimed at personal, emotional, confessional themes.",
  },
  {
    question: "What's the difference between emo and pop punk?",
    answer:
      "They overlap heavily, but pop punk is brighter and faster with lighter themes like youth and rebellion (Green Day, blink-182), while emo carries more emotional weight and leans melancholic and introspective (early Paramore, My Chemical Romance). Most modern 'emo' songs are really emo-pop or pop-punk hybrids.",
  },
  {
    question: "What are the main emo subgenres?",
    answer:
      "Common ones include classic/first-wave emo, emo-pop (the polished 2000s mainstream sound), emo-punk, screamo (harsher, screamed vocals), emo rap (emo themes over hip-hop production), and the current emo revival.",
  },
  {
    question: "Who are the most famous emo bands?",
    answer:
      "The best-known acts include My Chemical Romance, Fall Out Boy, Paramore, Panic! at the Disco, and Dashboard Confessional, alongside influential earlier and revival bands like Sunny Day Real Estate, Jimmy Eat World, and American Football.",
  },
  {
    question: "Is emo making a comeback?",
    answer:
      "Yes. Emo has had a strong resurgence through the emo revival scene, nostalgia-driven tours and festivals, emo rap crossing into the mainstream, and a constant stream of emo sounds on TikTok — so the genre is very much alive.",
  },
  {
    question: "What makes emo lyrics 'emo'?",
    answer:
      "Confessional, first-person honesty about heartbreak, anxiety, isolation, and self-doubt — delivered like a diary entry set to music, with very specific, concrete details rather than vague feelings.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        &quot;Emo&quot; gets used for everything from My Chemical Romance to a sad
        TikTok sound, so it&apos;s worth pinning down: what actually makes a song
        emo? Short answer — it&apos;s a mix of <strong>sound</strong> and{" "}
        <strong>sincerity</strong>. Emo takes the energy of punk rock and points
        it inward, at heartbreak, anxiety, and the stuff you&apos;d only admit at
        2am. Let&apos;s break down where it comes from, the musical and lyrical
        ingredients, the subgenres, and how it differs from pop punk.
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
      <p>
        These ingredients show up most dramatically in the genre&apos;s slow
        songs — we break that form down in{" "}
        <Link href="/blog/what-makes-a-great-emo-ballad">
          what makes a great emo ballad
        </Link>
        .
      </p>

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

      <h2>The main emo subgenres</h2>
      <p>
        &quot;Emo&quot; is really an umbrella. The ones you&apos;ll hear about
        most:
      </p>
      <ul>
        <li>
          <strong>Classic / first-wave emo</strong> — the raw, mid-80s to 90s
          roots (think Sunny Day Real Estate).
        </li>
        <li>
          <strong>Emo-pop</strong> — the polished, radio-ready 2000s sound that
          took over the mainstream (Fall Out Boy, Paramore).
        </li>
        <li>
          <strong>Emo-punk</strong> — closer to its punk origins, faster and
          rawer.
        </li>
        <li>
          <strong>Screamo</strong> — harsher and more intense, built around
          screamed vocals and dramatic dynamics.
        </li>
        <li>
          <strong>Emo rap</strong> — emo&apos;s confessional themes over hip-hop
          production, which brought the genre to a whole new generation.
        </li>
        <li>
          <strong>Emo revival</strong> — the 2010s-onward wave that brought back
          the intricate, twinkly guitar sound (American Football&apos;s
          influence looms large here).
        </li>
      </ul>

      <h2>Is emo making a comeback?</h2>
      <p>
        It never fully left, but it&apos;s undeniably having a moment. Nostalgia
        tours and festivals sell out, emo rap pushed the sound into the
        mainstream, the emo revival keeps producing new bands, and TikTok has
        turned the aesthetic — and the music — into a constant trend. Making your
        own emo song has never been more on-time, which is part of why{" "}
        <Link href="/blog/turn-your-words-into-an-emo-song">
          turning your words into an emo song
        </Link>{" "}
        took off as a format.
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
