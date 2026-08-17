import type { Metadata } from "next";
import Link from "next/link";
import { PACKS } from "@/lib/pricing";

// Commercial landing page, not a blog post — on purpose.
//
// `personalized song gift` is 1k–10k US searches/month with a top-of-page bid
// around A$14 (Keyword Planner, Aug 2026). That SERP is owned by product and
// service pages, so an article-shaped /blog/ post enters the wrong category and
// is also the exact shape AI Overviews absorb. See CONTENT-PLAN.md.
//
// Voice here is deliberately warmer than the blog. A gift buyer is doing
// something sincere; the sardonic breakup register we use elsewhere would
// undercut them. Still concrete, still not corporate — just not winking.

export const metadata: Metadata = {
  title: "Personalized Song Gift — Written About Them, in Minutes",
  // Price interpolated from lib/pricing so the meta can't drift from checkout.
  description: `Give a personalized song written about your person, not a template with their name dropped in. Real vocals, yours in minutes, from ${PACKS["1pack"].price}. First songs free.`,
  alternates: { canonical: "/personalized-song-gift" },
  openGraph: {
    type: "website",
    url: "https://texttoemo.com/personalized-song-gift",
    siteName: "Text to Emo",
    title: "Personalized Song Gift — Written About Them, in Minutes",
    description:
      "A custom song about your person, with real vocals, ready in minutes instead of weeks. Hear it free before you pay anything.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personalized Song Gift — Written About Them, in Minutes",
    description:
      "A custom song about your person, with real vocals, ready in minutes. Hear it free before you pay.",
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    question: "How do I make a personalized song as a gift?",
    answer:
      "Write one specific thing about them — a memory, an inside joke, the thing they always say — then pick a male or female vocalist and generate. You get a free 60-second preview, so you can hear the song before you decide to keep it. Unlocking the full track and downloading it costs one credit, and your first songs are free.",
  },
  {
    question: "How much does a personalized song gift cost?",
    answer:
      "A single song is $3.99, and credit packs bring that down to as little as $1.60 per song. Generating and previewing are always free. Custom-song services that use human songwriters typically charge well over $100 and take one to three weeks, so this is a different order of both price and speed.",
  },
  {
    question: "How long does it take?",
    answer:
      "About two minutes. That makes it a genuine option for a birthday you remembered late, which is not something a commissioned songwriter can offer.",
  },
  {
    question: "What kind of song will it be?",
    answer:
      "Emo and pop-punk — think Paramore, Fall Out Boy, My Chemical Romance. That is what Text to Emo makes, and it makes it properly rather than doing every genre adequately. It is a brilliant gift for someone who grew up on that music, and the wrong gift for someone who wants a soft acoustic ballad.",
  },
  {
    question: "Can I download it and give it as a file?",
    answer:
      "Yes. Once you unlock a song you have 7 days to download the MP3, and after that it is on your device to keep permanently. Send it directly, put it on a card as a link, or play it out loud and watch their face.",
  },
  {
    question: "What should I write about them?",
    answer:
      "The small, specific thing — not the compliment. 'You drove two hours at midnight when I said I was fine' makes a better song than 'you're always there for me,' because the first one could only be about them. Specificity is the whole difference between a gift and a greeting card.",
  },
];

export default function PersonalizedSongGiftPage() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Personalized Song Gift — Text to Emo",
    description:
      "A personalized emo or pop-punk song written about someone you choose, with AI-written lyrics and sung vocals, delivered in minutes as a downloadable MP3.",
    brand: { "@type": "Brand", name: "Text to Emo" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: (PACKS["25pack"].amount / 100 / PACKS["25pack"].credits).toFixed(
        2,
      ),
      highPrice: (PACKS["1pack"].amount / 100).toFixed(2),
      priceCurrency: "USD",
      offerCount: 4,
      availability: "https://schema.org/InStock",
      url: "https://texttoemo.com/personalized-song-gift",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://texttoemo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Personalized Song Gift",
        item: "https://texttoemo.com/personalized-song-gift",
      },
    ],
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
        >
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-white/20">›</span>
          <span className="text-white/60">Personalized Song Gift</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>🎵</span> Personalized song gift
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            A song that could only be{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
              about them
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto">
            Not a template with their name dropped into the chorus. Write one
            real thing about your person and get a full song about it — lyrics,
            vocals, guitars — in about two minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
            >
              ⚡ Make their song free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-bold text-white bg-white/8 hover:bg-white/15 transition-colors"
            >
              See pricing
            </Link>
          </div>
          <p className="text-xs text-white/35 mt-4">
            Free to make and preview · from {PACKS["1pack"].price} to keep · no
            subscription
          </p>
        </div>

        {/* Hear one first — same logic as /pricing: nobody should weigh a
            price before hearing what the product actually produces. */}
        <section className="mb-12">
          <p className="text-center text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Hear one first
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-3 sm:p-4">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black/40">
              <iframe
                src="https://www.youtube-nocookie.com/embed/3kvHlCvNbtk?rel=0"
                title="The Last Page of a Villain's Fairytale — made with Text to Emo"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-xs text-white/40 mt-3 px-1">
              &ldquo;The Last Page of a Villain&apos;s Fairytale&rdquo; —
              written and produced start to finish by Text to Emo.
            </p>
          </div>
        </section>

        <div className="article-content">
          <h2>How to make a personalized song gift</h2>
          <ol>
            <li>
              <strong>Write one specific thing about them.</strong> Not a
              compliment — a detail. The road trip, the inside joke, the thing
              they always say when they&apos;re nervous, the night they showed
              up for you without being asked.
            </li>
            <li>
              <strong>Choose the voice.</strong> A female vocalist in the
              Paramore, PVRIS, or Avril Lavigne register, or a male vocalist
              with Fall Out Boy, Green Day, and My Chemical Romance energy.
            </li>
            <li>
              <strong>Listen before you decide.</strong> Every version comes
              with a free 60-second preview. Run it more than once — the same
              detail produces noticeably different songs — and keep the one that
              sounds like them.
            </li>
          </ol>

          <h2>Why specific beats sentimental</h2>
          <p>
            Most personalized gifts fail the same way: they&apos;re about the
            <em> category</em> of person rather than the person. &quot;World&apos;s
            best mom.&quot; &quot;You&apos;re always there for me.&quot; True,
            and entirely interchangeable.
          </p>
          <p>
            The detail you&apos;d be slightly embarrassed to say out loud is
            almost always the one that lands. &quot;You drove two hours at
            midnight because I said I was fine and you didn&apos;t believe
            me&quot; could only be about one person. That&apos;s what turns a
            song into a gift rather than a gesture — and it&apos;s why the input
            box only needs one sentence, not an essay.
          </p>

          <h2>How this compares to a commissioned song</h2>
          <p>
            Custom-song services that pair you with a human songwriter typically
            run well over $100 and take one to three weeks. They&apos;re a
            lovely thing and they are not this. Here a song costs{" "}
            {PACKS["1pack"].price} — less in a pack — and takes about two
            minutes, which means it&apos;s still an option for a birthday you
            remembered on the day.
          </p>
          <p>
            The other honest difference: <strong>this makes one kind of music.</strong>{" "}
            Emo and pop-punk, done properly, rather than every genre done
            adequately. If your person grew up on My Chemical Romance, that
            specificity is the entire appeal. If they want a gentle acoustic
            ballad, buy them something else — genuinely.
          </p>

          <h2>Who it&apos;s a good gift for</h2>
          <ul>
            <li>
              <strong>The friend with the emo phase they never fully left.</strong>{" "}
              You know the one. This is aimed directly at them.
            </li>
            <li>
              <strong>A partner, on an anniversary.</strong> Pick the small
              domestic detail over the grand statement — the way they make
              coffee, not &quot;you complete me.&quot;
            </li>
            <li>
              <strong>A best friend who&apos;s moving away.</strong> Friendship
              songs are drastically underwritten, which is exactly why one lands
              so hard.
            </li>
            <li>
              <strong>Someone having a rough week.</strong> No occasion needed.
              An unprompted song on a random Tuesday outperforms most birthday
              presents.
            </li>
          </ul>

          <h2>What you get</h2>
          <ul>
            <li>A full-length song with sung vocals, guitars, and drums</li>
            <li>Lyrics written around your detail, not a fill-in-the-blank template</li>
            <li>A free 60-second preview of every version before you spend anything</li>
            <li>
              An MP3 download with no watermark — you have 7 days to save the
              file, and once it&apos;s on your device it&apos;s yours to keep
            </li>
            <li>No subscription, and credits that never expire</li>
          </ul>

          <h2>Make their song</h2>
          <p>
            Think of the one detail you&apos;d never put on a card. That&apos;s
            the song. <Link href="/">Open the generator</Link>, write it down,
            and hear it back before you decide anything — your first songs are
            free, so the only thing it costs to try is the two minutes.
          </p>
        </div>

        {/* FAQ (visible content backing the FAQPage schema) */}
        <section className="article-content mt-10">
          <h2>Frequently asked questions</h2>
          {faq.map((f) => (
            <div key={f.question}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </section>

        {/* Closing CTA */}
        <div className="mt-10 rounded-2xl border border-[#9b30ff]/40 bg-[#0f0520]/80 p-6 text-center">
          <p className="text-xl font-black text-white mb-2">
            One sentence about them is enough
          </p>
          <p className="text-sm text-white/50 mb-4">
            Write it, pick a voice, and hear their song in about two minutes.
            Your first songs are free.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
          >
            ⚡ Open the generator
          </Link>
        </div>

        {/* Related reading */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">
            Keep reading
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/blog/emo-breakup-song"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                How to Make a Song About Your Ex
              </Link>
            </li>
            <li>
              <Link
                href="/blog/song-for-your-best-friend"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                How to Make a Song for Your Best Friend with AI
              </Link>
            </li>
            <li>
              <Link
                href="/blog/songs-like-emo-bands"
                className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
              >
                Make a Song That Sounds Like Paramore, MCR, or Fall Out Boy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
