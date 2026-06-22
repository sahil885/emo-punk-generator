import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Making Emo Songs with AI | Text to Emo",
  description:
    "Guides on making emo and pop punk songs with AI: how to turn your words into a track, write emo lyrics, and what actually makes a song emo.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <nav className="text-sm mb-8">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            ← Back to the generator
          </Link>
        </nav>

        <p className="text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-3">
          Text to Emo Blog
        </p>
        <h1 className="text-4xl font-black text-white leading-tight mb-3">
          Making emo songs with AI
        </h1>
        <p className="text-white/50 mb-10">
          Guides, ideas, and the occasional rabbit hole on turning feelings into
          full emo pop punk tracks — no band required.
        </p>

        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#9b30ff]/40 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-black text-white group-hover:text-[#ff64a6] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-white/50 mt-2">{post.excerpt}</p>
                <span className="inline-block mt-3 text-xs font-bold text-[#ff2d78]">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
