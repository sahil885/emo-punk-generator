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
    title: "Turn Your Texts Into an Emo Song with AI (Viral Trend, Explained)",
    description:
      "How to turn your texts into an emo song with AI — paste the words, pick a vocalist, and get a real song with vocals in minutes. The viral trend, explained.",
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
    title: "What Makes a Great Emo Ballad? The Elements, Explained",
    description:
      "The elements that define a great emo ballad: quiet-loud dynamics, confessional lyrics, the build, and the breakdown — with classic examples and how to write your own.",
    date: "2026-06-28",
    excerpt:
      "From the whispered first verse to the chorus that levels you — the exact elements that make an emo ballad great, and how to write one yourself.",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
