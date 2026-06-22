import Link from "next/link";
import { posts, type Post } from "@/lib/blog";

const SITE = "https://texttoemo.com";

export interface FaqItem {
  question: string;
  answer: string;
}

// Shared chrome for an article page: structured data (BlogPosting +
// BreadcrumbList + FAQPage), breadcrumbs, H1, body, FAQ, CTA, and internal
// links to the other posts.
export default function BlogShell({
  post,
  faq,
  children,
}: {
  post: Post;
  faq: FaqItem[];
  children: React.ReactNode;
}) {
  const others = posts.filter((p) => p.slug !== post.slug);
  const url = `${SITE}/blog/${post.slug}`;
  const prettyDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const publisher = {
    "@type": "Organization",
    name: "Text to Emo",
    url: SITE,
  };

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: publisher,
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
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

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
      </div>

      <article className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Visible breadcrumb (matches BreadcrumbList schema) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8 flex-wrap">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/20">›</span>
          <Link href="/blog" className="text-white/40 hover:text-white transition-colors">
            Blog
          </Link>
          <span className="text-white/20">›</span>
          <span className="text-white/60">{post.title}</span>
        </nav>

        <p className="text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-3">
          Text to Emo Blog
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
          {post.title}
        </h1>
        <p className="text-xs text-white/35 mb-8">{prettyDate}</p>

        <div className="article-content">{children}</div>

        {/* FAQ (visible content backing the FAQPage schema) */}
        {faq.length > 0 && (
          <section className="article-content mt-4">
            <h2>Frequently asked questions</h2>
            {faq.map((f) => (
              <div key={f.question}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </section>
        )}

        {/* Conversion CTA */}
        <div className="mt-10 rounded-2xl border border-[#9b30ff]/40 bg-[#0f0520]/80 p-6 text-center">
          <p className="text-xl font-black text-white mb-2">
            Make your own emo song now
          </p>
          <p className="text-sm text-white/50 mb-4">
            Drop any words and get a full track with vocals in minutes. Your first songs are free.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 transition-opacity"
          >
            ⚡ Open the generator
          </Link>
        </div>

        {/* Internal links to sibling posts */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">
            Keep reading
          </p>
          <ul className="flex flex-col gap-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-[#ff64a6] hover:text-[#ff2d78] font-semibold transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
