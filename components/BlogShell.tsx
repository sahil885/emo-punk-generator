import Link from "next/link";
import { posts, type Post } from "@/lib/blog";

// Shared chrome for an article page: background, nav, H1, body, CTA, and
// auto-generated links to the other posts (internal linking).
export default function BlogShell({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) {
  const others = posts.filter((p) => p.slug !== post.slug);
  const prettyDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
      </div>

      <article className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-4 text-sm mb-8">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            ← Text to Emo
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/blog" className="text-white/40 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        <p className="text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-3">
          Text to Emo Blog
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
          {post.title}
        </h1>
        <p className="text-xs text-white/35 mb-8">{prettyDate}</p>

        <div className="article-content">{children}</div>

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
