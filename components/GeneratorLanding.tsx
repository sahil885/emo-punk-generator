import Link from "next/link";
import HomeApp from "@/components/HomeApp";
import { SITE_URL } from "@/lib/about";
import { PACKS } from "@/lib/pricing";

// Shell for the commercial "… generator" pages.
//
// These terms (emo lyrics generator, punk lyrics generator, emo song title
// generator, …) already earn impressions at positions 65–87: Google associates
// the domain with them but had no page to rank, so it served blog posts. The
// pages that beat us put a working tool on the page, so this renders the real
// generator — same component as the homepage — with the page's own heading,
// copy and schema around it.

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export default function GeneratorLanding({
  eyebrow,
  headline,
  highlight,
  headlineTail,
  subheading,
  path,
  breadcrumbName,
  productName,
  productDescription,
  faq,
  related,
  children,
}: {
  eyebrow: string;
  headline: string;
  /** Gradient-highlighted words in the middle of the H1. */
  highlight: string;
  headlineTail?: string;
  subheading: string;
  path: string;
  breadcrumbName: string;
  productName: string;
  productDescription: string;
  faq: LandingFaq[];
  related?: RelatedLink[];
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDescription,
    brand: { "@type": "Brand", name: "Text to Emo" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: (PACKS["25pack"].amount / 100 / PACKS["25pack"].credits).toFixed(2),
      highPrice: (PACKS["1pack"].amount / 100).toFixed(2),
      priceCurrency: "USD",
      offerCount: 4,
      availability: "https://schema.org/InStock",
      url,
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: breadcrumbName, item: url },
    ],
  };

  return (
    <HomeApp
      eyebrow={eyebrow}
      heading={
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          {headline}{" "}
          <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent">
            {highlight}
          </span>
          {headlineTail ? ` ${headlineTail}` : ""}
        </h1>
      }
      subheading={subheading}
      breadcrumb={
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-6 flex-wrap"
        >
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/20">›</span>
          <span className="text-white/60">{breadcrumbName}</span>
        </nav>
      }
      info={
        <section className="mt-12 sm:mt-14">
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

          <div className="article-content">{children}</div>

          <section className="article-content mt-10">
            <h2>Frequently asked questions</h2>
            {faq.map((f) => (
              <div key={f.question}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </section>

          {related && related.length > 0 && (
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">
                More generators
              </p>
              <ul className="flex flex-col gap-3">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      }
    />
  );
}
