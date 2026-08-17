import type { Metadata } from "next";

// Single source of truth for blog posts — used by the index page, each
// article's metadata, and the sitemap. Article bodies live in their page.tsx.
export interface Post {
  slug: string;
  title: string; // SEO <title>
  description: string; // meta description
  date: string; // ISO date
  excerpt: string; // shown on the blog index
}

// Shared per-article metadata: canonical, OpenGraph and Twitter cards with the
// branded OG image. (Nested segments don't inherit the root file-based OG
// image once they define their own openGraph, so it's set explicitly here.)
export function postMetadata(post: Post): Metadata {
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://texttoemo.com/blog/${post.slug}`,
      type: "article",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
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
    title: "Turn Your Texts Into an Emo Song (Free AI Generator)",
    description:
      "Paste a text, pick a vocalist, get a full emo song with real vocals in minutes. No band, no studio, no instruments. Your first songs are free — start now.",
    date: "2026-06-17",
    excerpt:
      "The viral 'turn your texts into an emo song' trend, explained — and how to make your own from a screenshot, a voice note, or a late-night thought.",
  },
  {
    slug: "what-makes-a-song-emo",
    title: "Emo vs. Pop Punk: The Real Difference, With Examples",
    description:
      "Emo and pop punk get used interchangeably and they are not the same thing. The sound, the lyrics, the subgenres — sorted out with songs you already know.",
    date: "2026-06-17",
    excerpt:
      "Minor keys, confessional lyrics, quiet-loud dynamics: a quick guide to what makes a song emo, and how it differs from pop punk.",
  },
  {
    slug: "emo-breakup-song",
    title: "How to Make an Emo Breakup Song About Your Ex (with AI)",
    description:
      "Heartbroken? Turn it into a song. Here's how to make an emo breakup song about your ex with AI — full lyrics, vocals, and music in minutes. First songs free.",
    date: "2026-06-27",
    excerpt:
      "Breakups are emo's whole reason for existing. Here's how to turn the worst text, the last voicemail, or a 2am spiral into a full breakup anthem.",
  },
  {
    slug: "how-to-write-emo-lyrics",
    title: "How to Write Emo & Pop Punk Lyrics (with AI Examples)",
    description:
      "A practical guide to writing emo and pop punk lyrics: structure, the confessional voice, imagery, and hooks — plus how to use AI to draft a full song.",
    date: "2026-06-27",
    excerpt:
      "The exact techniques behind great emo lyrics — specificity, quiet-loud contrast, the confessional 'I' — and how to get there fast with AI.",
  },
  {
    slug: "ai-diss-track-generator",
    title: "How to Make a Diss Track with AI (Pop Punk Style)",
    description:
      "Make a sung, pop punk diss track about anyone with AI — full lyrics, vocals, and beat in minutes. Not a rap generator: this roasts in anthemic emo style.",
    date: "2026-06-28",
    excerpt:
      "Most diss track generators spit rap bars. Here's how to make a sung, anthemic pop punk diss track that actually slaps on TikTok — about your ex, your enemy, anyone.",
  },
  {
    slug: "songs-like-emo-bands",
    title: "Make a Song That Sounds Like Paramore, MCR, or Fall Out Boy",
    description:
      "Want a song that sounds like My Chemical Romance, Paramore, or Fall Out Boy? Here's how to get each band's vibe with AI — vocalist, themes, and prompt tips.",
    date: "2026-06-28",
    excerpt:
      "How to dial in the sound of your favorite emo and pop punk bands with AI — the vocalist choice, lyrical themes, and prompts that capture each one's vibe.",
  },
  {
    slug: "what-makes-a-great-emo-ballad",
    title: "How to Write an Emo Ballad: The Elements That Land",
    description:
      "The quiet first verse, the build, the breakdown that levels you — the elements behind every great emo ballad, and how to turn yours into a real song today.",
    date: "2026-06-28",
    excerpt:
      "From the whispered first verse to the chorus that levels you — the exact elements that make an emo ballad great, and how to write one yourself.",
  },
  {
    slug: "song-for-your-crush",
    title: "How to Make a Song for Your Crush with AI (in Minutes)",
    description:
      "Got a crush you can't stop thinking about? Here's how to make a song for your crush with AI — full emo lyrics, vocals, and music in minutes. First songs free.",
    date: "2026-07-21",
    excerpt:
      "The most emo move you can make with a crush? Write the song you'll never send. Here's how to turn that 2am feeling into a full pop-punk track in minutes.",
  },
  {
    slug: "how-to-make-a-sad-song-with-ai",
    title: "How to Make a Sad Song with AI (That Actually Hurts)",
    description:
      "Learn how to make a sad song with AI — type what hurts, pick a vocalist, and get full emo lyrics, vocals, and music in minutes. Your first songs are free.",
    date: "2026-07-27",
    excerpt:
      "Generic sad-music generators give you moody background loops. Here's how to make a sad song with real words, real vocals, and a chorus that actually hurts.",
  },
  {
    slug: "make-a-song-about-someone",
    title: "How to Make a Song About Someone with AI (Ex, Crush, Anyone)",
    description:
      "How to make a song about someone with AI — your ex, your crush, your best friend, anyone. Type one real detail and get full emo lyrics and vocals in minutes.",
    date: "2026-07-27",
    excerpt:
      "Ex, crush, best friend, worst enemy — anyone can be a song. Here's how to make a song about someone with AI, starting from one specific, slightly embarrassing detail.",
  },
  {
    slug: "emo-song-ideas",
    title: "50 Emo Song Ideas & Prompts (Turn One Into a Real Song)",
    description:
      "50 emo song ideas and prompts you can steal — breakups, crushes, diss tracks, 2am spirals. Pick one, paste it in, and get a full song with vocals in minutes.",
    date: "2026-08-03",
    excerpt:
      "Stuck staring at an empty text box? Here are 50 emo song ideas — organized by feeling — that you can paste straight into a generator and hear sung back to you.",
  },
  {
    slug: "song-for-your-best-friend",
    title: "How to Make a Song for Your Best Friend with AI (Not Cheesy)",
    description:
      "How to make a song for your best friend with AI without it sounding like a greeting card. Real lyrics, real vocals, done in minutes. Your first songs are free.",
    date: "2026-08-10",
    excerpt:
      "Most friendship songs sound like a birthday card set to music. Here's how to make a song for your best friend that's actually specific enough to make them cry.",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
