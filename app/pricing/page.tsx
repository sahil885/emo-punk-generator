import type { Metadata } from "next";
import Link from "next/link";
import { PACK_LIST, perSong, savingsPct } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Text to Emo | Credits from $1.60 a Song",
  description:
    "Generating songs is free — you only pay to unlock the full track. Buy a single song for $3.99, or save up to 60% with credit packs. Credits never expire.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "https://texttoemo.com/pricing",
    siteName: "Text to Emo",
    title: "Text to Emo Pricing — From $1.60 a Song",
    description:
      "Free to generate, free 60-second preview. Pay only to unlock full songs. Packs from $3.99 to $39.99, credits never expire.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Emo Pricing — From $1.60 a Song",
    description:
      "Free to generate. Pay only to unlock full songs. Credit packs from $3.99, credits never expire.",
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    question: "How much does an AI emo song cost?",
    answer:
      "Generating a song and hearing a 60-second preview is free. You only pay to unlock the full track and download it. A single song is $3.99, and credit packs bring that down to as little as $1.60 per song.",
  },
  {
    question: "Do I need to buy credits to try it?",
    answer:
      "No. Sign in and you can generate songs for free and hear a 60-second preview of every one. You also get 2 free songs when you sign up, so your first full tracks cost nothing.",
  },
  {
    question: "Do credits expire?",
    answer:
      "No. Credits never expire — buy a pack and use it whenever you like. The song files themselves are a separate thing: you have 7 days to download a track before it's removed from our servers, but once you've downloaded it, it's yours forever.",
  },
  {
    question: "How long do I have to download my song?",
    answer:
      "7 days from when you make it. Hosting audio is the most expensive part of running Text to Emo, so tracks are removed after that to keep prices low. Your library shows how many days each song has left — download the ones you love and they're yours to keep permanently.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No. There's no subscription and no recurring charge. You buy credits once and they stay on your account until you use them.",
  },
  {
    question: "What do I get when I unlock a song?",
    answer:
      "One credit unlocks the complete song — full-length audio with vocals and music — plus the MP3 download. Save the file within 7 days and it's yours to keep and post anywhere, with no watermark.",
  },
];

export default function PricingPage() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Text to Emo — Song Credits",
    description:
      "Credits to unlock full AI-generated emo and pop punk songs on Text to Emo. One credit unlocks one full song plus download.",
    brand: { "@type": "Brand", name: "Text to Emo" },
    offers: PACK_LIST.map((p) => ({
      "@type": "Offer",
      name: p.label,
      price: (p.amount / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://texttoemo.com/pricing",
    })),
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
        name: "Pricing",
        item: "https://texttoemo.com/pricing",
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
        >
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/20">›</span>
          <span className="text-white/60">Pricing</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            {/* Not 🪙 (U+1FA99, Emoji 13.0) — it has no glyph on older devices
                and falls back to a tofu box. 🎵 is Unicode 6.0, safe anywhere. */}
            <span>🎵</span> Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Making songs is{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
              free
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto">
            Generate as many songs as you like and hear a 60-second preview of
            every one. You only pay a credit to unlock the full track and
            download it.
          </p>
        </div>

        {/* ── Hear one first ───────────────────────────────────────────
            Sits above the prices on purpose: nobody should be asked to weigh
            $3.99 before they've heard what the product actually produces. */}
        <section className="mb-10 sm:mb-12">
          <p className="text-center text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Hear a real one first
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/3 p-3 sm:p-4">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black/40">
              <iframe
                // nocookie host + lazy load: the player is below-the-fold
                // weight on a mostly-mobile audience.
                src="https://www.youtube-nocookie.com/embed/3kvHlCvNbtk?rel=0"
                title="The Last Page of a Villain's Fairytale — made with Text to Emo"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between gap-3 flex-wrap px-1 pt-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  “The Last Page of a Villain&apos;s Fairytale”
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Written and produced start to finish by Text to Emo
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center min-h-[40px] rounded-xl px-4 text-sm font-bold text-white bg-white/8 hover:bg-white/15 transition-colors whitespace-nowrap"
              >
                Make one free →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Mobile: stacked cards ─────────────────────────────────── */}
        <div className="flex flex-col gap-4 md:hidden">
          {PACK_LIST.map((p) => {
            const saving = savingsPct(p);
            return (
              <div
                key={p.id}
                className="relative rounded-2xl border-2 p-5"
                style={{
                  borderColor: p.highlight ? "#ff2d78" : "rgba(255,255,255,0.12)",
                  background: p.highlight
                    ? "rgba(255,45,120,0.08)"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                {p.badge && (
                  <span
                    className="absolute -top-3 left-5 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg"
                    style={{ background: p.highlight ? "#ff2d78" : "#9b30ff" }}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="flex items-end justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">
                        {p.credits}
                      </span>
                      <span className="text-sm font-bold text-white/70">
                        {p.credits === 1 ? "credit" : "credits"}
                      </span>
                    </div>
                    <p className="text-xs text-white/45 mt-1">{p.blurb}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className="text-2xl font-black leading-none"
                      style={{ color: p.highlight ? "#ff2d78" : "#fff" }}
                    >
                      {p.price}
                    </div>
                    <div className="text-[11px] text-white/40 mt-1">
                      {perSong(p)} / song
                    </div>
                  </div>
                </div>
                {saving > 0 ? (
                  <p className="text-xs font-semibold text-[#00cfff] mb-4">
                    Save {saving}% vs. buying single songs
                  </p>
                ) : (
                  <p className="text-xs text-white/35 mb-4">
                    Pay as you go — no commitment
                  </p>
                )}
                <Link
                  href={`/?pack=${p.id}`}
                  className="flex items-center justify-center w-full min-h-[48px] rounded-xl px-4 font-bold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: p.highlight
                      ? "linear-gradient(to right, #ff2d78, #9b30ff)"
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  Get {p.credits} {p.credits === 1 ? "song" : "songs"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Desktop: comparison table ─────────────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-white/40 uppercase">
                  Pack
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-white/40 uppercase">
                  Songs
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-white/40 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-white/40 uppercase">
                  Per song
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-widest text-white/40 uppercase">
                  Saving
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {PACK_LIST.map((p) => {
                const saving = savingsPct(p);
                return (
                  <tr
                    key={p.id}
                    className="border-t border-white/8"
                    style={{
                      background: p.highlight
                        ? "rgba(255,45,120,0.07)"
                        : "transparent",
                    }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-white">{p.label}</span>
                        {p.badge && (
                          <span
                            className="text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide"
                            style={{
                              background: p.highlight ? "#ff2d78" : "#9b30ff",
                            }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/40 mt-1">{p.blurb}</p>
                    </td>
                    <td className="px-6 py-5 text-white font-bold">{p.credits}</td>
                    <td
                      className="px-6 py-5 text-xl font-black"
                      style={{ color: p.highlight ? "#ff2d78" : "#fff" }}
                    >
                      {p.price}
                    </td>
                    <td className="px-6 py-5 text-white/70">{perSong(p)}</td>
                    <td className="px-6 py-5">
                      {saving > 0 ? (
                        <span className="text-[#00cfff] font-semibold">
                          {saving}%
                        </span>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/?pack=${p.id}`}
                        className="inline-flex items-center justify-center min-h-[44px] rounded-xl px-5 font-bold text-white text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{
                          background: p.highlight
                            ? "linear-gradient(to right, #ff2d78, #9b30ff)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        Choose
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-white/30 mt-5">
          🔒 Secure checkout via Stripe · No subscription · Credits never expire
          · 7 days to download each track
        </p>

        {/* ── How credits work ──────────────────────────────────────── */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
            How credits work
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "✍️",
                title: "Write & generate free",
                body: "Type any words and generate a full song with AI lyrics, vocals and music. Generating never costs a credit.",
              },
              {
                icon: "🎧",
                title: "Preview free",
                body: "Hear a 60-second preview of every song you make. Regenerate as many times as you like until one clicks.",
              },
              {
                icon: "🔓",
                title: "Unlock with 1 credit",
                body: "Spend a single credit to unlock the complete track, then save the MP3 within 7 days. Once downloaded, it's yours to keep and post anywhere.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/3 p-5"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <h3 className="font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
            Pricing questions
          </h2>
          <div className="flex flex-col gap-3">
            {faq.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-white/10 bg-white/3 px-5 py-4"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-white list-none">
                  {f.question}
                  <span className="text-[#9b30ff] text-xl leading-none flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-sm text-white/55 leading-relaxed mt-3">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div className="mt-14 sm:mt-16 rounded-2xl border border-[#9b30ff]/40 bg-[#0f0520]/80 p-6 sm:p-8 text-center">
          <p className="text-xl sm:text-2xl font-black text-white mb-2">
            Start with a free song
          </p>
          <p className="text-sm text-white/50 mb-5 max-w-md mx-auto">
            Sign in, type anything, and hear it as an emo pop punk track in
            minutes. You get 2 free songs when you sign up.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[52px] rounded-xl px-8 font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
          >
            Make a song free →
          </Link>
        </div>
      </div>
    </main>
  );
}
