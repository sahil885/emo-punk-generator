import Link from "next/link";
import BlogShell, { type FaqItem } from "@/components/BlogShell";
import { getPost, postMetadata } from "@/lib/blog";

const post = getPost("song-for-your-best-friend")!;

export const metadata = postMetadata(post);

const faq: FaqItem[] = [
  {
    question: "How do I make a song for my best friend with AI?",
    answer:
      "Type one specific memory about them — not a compliment, a memory — into Text to Emo, pick a male or female vocalist, and generate. Claude writes the lyrics from your detail and Suno performs them as a full emo pop-punk track with vocals, guitars, and drums. It takes a couple of minutes, and generating plus a 60-second preview are free once you sign in.",
  },
  {
    question: "What should a song for your best friend actually be about?",
    answer:
      "One night, one inside joke, or one thing they did for you that you never properly thanked them for. Songs that say “you're always there for me” could be about anybody. Songs that say “you drove ninety minutes at 1am and didn't ask a single question” could only be about them — and that's the one that lands.",
  },
  {
    question: "Isn't an emo song a weird choice for a friendship song?",
    answer:
      "It's the right choice, actually. Emo and pop punk are built on loyalty, nostalgia, and saying the embarrassing thing out loud — which is exactly what a best friend song needs. A sincere friendship anthem in a Paramore or Fall Out Boy register hits way harder than another acoustic ballad about sunshine.",
  },
  {
    question: "Can I make a song for a friend I've drifted apart from?",
    answer:
      "Yes, and honestly those come out best. Friendship breakups almost never get songs written about them despite being some of the worst pain there is. Write it at the version of them you miss — the group chat that died, the thing you still save up to tell them — and let the chorus do what you can't text.",
  },
  {
    question: "Can I post the finished song on TikTok or send it to them?",
    answer:
      "That's the whole point. Once you unlock a track you can download it and post it to TikTok or Instagram, or just send them the file with no context and enjoy the reply. Friend-tag songs travel well because everybody wants to send one to their own person.",
  },
];

export default function Page() {
  return (
    <BlogShell post={post} faq={faq}>
      <p>
        You want to make a song for your best friend, and you already know the
        risk: it comes out sounding like a laminated greeting card. Every
        friendship song on the internet says the same four things &mdash;
        you&apos;re always there for me, we&apos;ve been through so much, thanks
        for everything, love you forever. All true. All completely
        interchangeable. None of it sounds like <em>them</em>.
      </p>
      <p>
        Here&apos;s how to make a song for your best friend that&apos;s specific
        enough to be slightly embarrassing, which is the only kind that works.
        You can do the whole thing on <Link href="/">Text to Emo</Link> in about
        the time it takes to find a decent photo of the two of you.
      </p>

      <h2>Why the emo version beats the sweet version</h2>
      <p>
        Most friendship-song tools point you at soft acoustic pop, because
        somebody decided friendship equals gentle. But think about what a best
        friend actually is: the person who has seen you at your absolute worst
        and stayed anyway. That&apos;s not a ukulele feeling. That&apos;s a
        Paramore feeling.
      </p>
      <p>
        Emo and pop punk have always been genres about loyalty and the fear of
        losing it. Half the canon is about a hometown, a car, and one person who
        made it survivable. The register is confessional, the choruses are
        enormous, and the whole genre&apos;s entire posture is{" "}
        <em>saying the sincere thing too loudly</em>. That&apos;s the right
        emotional container for a best friend song &mdash; and it&apos;s the
        difference between a track they politely say &quot;aww&quot; to and one
        they play in the car three times in a row. If you&apos;re curious about
        why the genre works this way, we broke it down in{" "}
        <Link href="/blog/what-makes-a-song-emo">what makes a song emo</Link>.
      </p>

      <h2>Step 1: Pick one memory, not the whole friendship</h2>
      <p>
        This is the entire game. The instinct is to summarize ten years into four
        lines, and summaries are where songs go to die. Instead pick a single
        scene you could describe to a stranger in one sentence.
      </p>
      <p>Good candidates:</p>
      <ul>
        <li>
          <strong>The rescue.</strong> The night they showed up, drove out, sat
          on the floor with you, or answered on the second ring.
        </li>
        <li>
          <strong>The stupid one.</strong> The dumbest thing you two ever did
          together, described with total seriousness.
        </li>
        <li>
          <strong>The inside joke.</strong> The phrase that means nothing to
          anyone else and makes you both fold in half.
        </li>
        <li>
          <strong>The unthanked thing.</strong> Something they did that you never
          acknowledged properly, and still think about.
        </li>
        <li>
          <strong>The distance.</strong> They moved, you got busy, the texts got
          shorter &mdash; and you miss them in a way that&apos;s hard to say
          sober.
        </li>
      </ul>
      <p>
        Notice that none of those are compliments. Compliments make bad lyrics
        because they&apos;re claims. Memories make good lyrics because
        they&apos;re evidence.
      </p>

      <h2>Step 2: Write it as one specific sentence</h2>
      <p>
        Your prompt should read like something you&apos;d text at 1am, not like
        something you&apos;d put in a toast. Name the street, the car, the
        hoodie, the hour.
      </p>
      <ul>
        <li>
          &quot;You drove two hours at midnight because I said I was fine and you
          didn&apos;t believe me&quot;
        </li>
        <li>
          &quot;We&apos;ve been quoting the same nine words to each other since
          2017&quot;
        </li>
        <li>
          &quot;You sat in the hospital parking lot for four hours and never came
          in&quot;
        </li>
        <li>
          &quot;You moved across the country and I still save things to tell
          you&quot;
        </li>
        <li>
          &quot;You&apos;re the only person who calls me on my nonsense and the
          only one I let&quot;
        </li>
        <li>
          &quot;We didn&apos;t fight, we just got busy, and I hate how normal
          that felt&quot;
        </li>
      </ul>
      <p>
        One sentence is plenty. Longer prompts almost always make the lyrics
        vaguer, because you end up explaining the friendship instead of showing
        one frame of it. If you want more angles to steal, there&apos;s a whole
        pile in our list of <Link href="/blog/emo-song-ideas">emo song ideas</Link>.
      </p>

      <h2>Step 3: Choose the voice that sounds like your friendship</h2>
      <p>
        On Text to Emo you pick a <strong>female vocalist</strong> &mdash;
        Paramore, PVRIS, Avril Lavigne energy &mdash; or a{" "}
        <strong>male vocalist</strong> with the Fall Out Boy, Green Day, and My
        Chemical Romance thing going on. This isn&apos;t about matching your
        friend&apos;s gender. It&apos;s about matching the temperature of what
        you wrote.
      </p>
      <ul>
        <li>
          <strong>Bright, sharp, a little bratty?</strong> The female vocalist
          nails the fond-exasperation register &mdash; the &quot;you&apos;re an
          idiot and I&apos;d take a bullet for you&quot; tone.
        </li>
        <li>
          <strong>Nostalgic, dramatic, hometown-shaped?</strong> The male
          vocalist leans theatrical, which is perfect for the ones about
          growing up together and getting scattered.
        </li>
      </ul>
      <p>
        You get a free 60-second preview, so the honest move is to run the same
        sentence through both and keep whichever one makes you sit up straight.
        More on dialing in specific band sounds in{" "}
        <Link href="/blog/songs-like-emo-bands">
          how to make a song that sounds like Paramore, MCR, or Fall Out Boy
        </Link>
        .
      </p>

      <h2>Step 4: Generate, then change exactly one detail</h2>
      <p>
        Listen to the first version all the way through before you judge it. The
        chorus is where you&apos;ll know &mdash; if it lands on your actual
        detail, you&apos;re done. If it drifted into generic
        friendship-poster language, that&apos;s a signal your prompt was too
        broad, not that the AI failed you.
      </p>
      <p>
        The fix is almost always to get <em>more</em> specific, not more
        explanatory. Swap &quot;you&apos;re always there for me&quot; for
        &quot;you answered on the second ring.&quot; Swap &quot;we had a great
        summer&quot; for &quot;we ate gas station pizza in a parking lot until
        the sun came up.&quot; Change one noun and the entire chorus moves. Run
        it again &mdash; and if you want the underlying craft rules, they&apos;re
        in <Link href="/blog/how-to-write-emo-lyrics">how to write emo lyrics</Link>.
      </p>

      <h2>What to do with it</h2>
      <p>
        Send it with no explanation. That&apos;s the correct delivery method for
        a best friend song and it is not close. A birthday, a move, a wedding, a
        random Tuesday when they&apos;ve had a bad week &mdash; all valid, and
        the random Tuesday is arguably the strongest play.
      </p>
      <p>
        You can also post it. Friendship songs do numbers on TikTok and Instagram
        because they&apos;re inherently taggable: everybody who hears yours
        immediately thinks of their own person. A hyper-specific detail travels
        further than a universal one, which feels backwards until you watch it
        happen.
      </p>

      <h2>Make the song</h2>
      <p>
        You don&apos;t need a band, a studio, an instrument, or any idea what a
        chord is. You need one sentence about one night.{" "}
        <Link href="/">Open the generator</Link>, paste it in, pick your
        vocalist, and let Claude write the lyrics and Suno sing them back to you.
        Generating and a 60-second preview are free after you sign in, and your
        first songs are free &mdash; which means the only thing standing between
        you and a real friendship anthem is deciding which memory you&apos;re
        brave enough to use.
      </p>
      <p>
        Pick the one that makes you a little uncomfortable. Best friends have
        already seen worse.
      </p>
    </BlogShell>
  );
}
