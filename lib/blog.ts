// Single source of truth for blog posts — used by the index page, each
// article's metadata, and the sitemap. Article bodies live in their page.tsx.
export interface Post {
  slug: string;
  title: string; // SEO <title>
  description: string; // meta description
  date: string; // ISO date
  excerpt: string; // shown on the blog index
}

export const posts: Post[] = [
  {
    slug: "how-to-make-an-emo-song",
    title: "How to Make an Emo Song with AI (Free, in Minutes)",
    description:
      "Learn how to make an emo song with AI in three steps — no instruments, no studio. Turn a feeling into full lyrics, vocals, and music in minutes, free.",
    date: "2026-06-17",
    excerpt:
      "No band, no studio, no problem. Here's how to turn a single feeling into a full emo pop punk track with AI in about a minute.",
  },
  {
    slug: "turn-your-words-into-an-emo-song",
    title: "Turn Your Words (or Texts) Into an Emo Song with AI",
    description:
      "That TikTok trend where people turn their texts into an emo song? Here's how to do it yourself — paste any words and get a real song with vocals, free.",
    date: "2026-06-17",
    excerpt:
      "The viral 'turn your texts into an emo song' trend, explained — and how to make your own from a screenshot, a voice note, or a late-night thought.",
  },
  {
    slug: "what-makes-a-song-emo",
    title: "What Makes a Song Emo? Emo vs. Pop Punk, Explained",
    description:
      "What actually makes a song emo? A plain-English guide to emo's sound, lyrics, and subgenres — and how emo differs from pop punk — with examples.",
    date: "2026-06-17",
    excerpt:
      "Minor keys, confessional lyrics, quiet-loud dynamics: a quick guide to what makes a song emo, and how it differs from pop punk.",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
