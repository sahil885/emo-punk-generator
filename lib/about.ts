// Plain-language facts about the product, shared by the homepage explainer, its
// structured data, and /llms.txt — the copy AI assistants and search engines
// quote when describing Text to Emo, so it has to agree everywhere.
//
// Prices come from lib/pricing.ts and the download window from lib/retention.ts;
// don't restate either as a literal here.

import { SIGNUP_CREDITS } from "@/lib/authAdapter";
import { PACK_LIST, PACKS, perSong } from "@/lib/pricing";
import { AUDIO_RETENTION_DAYS } from "@/lib/retention";

export const SITE_URL = "https://texttoemo.com";

export const FREE_SONGS_ON_SIGNUP = SIGNUP_CREDITS;

const cheapestPerSong = PACK_LIST.reduce((low, p) =>
  p.amount / p.credits < low.amount / low.credits ? p : low
);

export const PRICE_SINGLE = PACKS["1pack"].price;
export const PRICE_LOWEST_PER_SONG = perSong(cheapestPerSong);

export const SITE_SUMMARY =
  "Text to Emo is an AI song generator that turns any text — a feeling, a " +
  "memory, a text message — into a full emo or pop punk song with lyrics, " +
  "vocals and music. AI writes the lyrics in seconds and the finished track " +
  "is ready in a few minutes. It's free to try: every song comes with a free " +
  `60-second preview, new accounts get ${FREE_SONGS_ON_SIGNUP} free full ` +
  `songs, and after that a full song costs ${PRICE_SINGLE}, or as little as ` +
  `${PRICE_LOWEST_PER_SONG} per song in a credit pack.`;

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    question: "What is Text to Emo?",
    answer: SITE_SUMMARY,
  },
  {
    question: "How does Text to Emo work?",
    answer:
      "Type any words — a feeling, a memory, an inside joke, a message you never " +
      "sent — and pick a male or female vocalist. Claude AI writes original " +
      "lyrics around your words, then Suno produces the full song with vocals, " +
      "guitars and drums. You hear a 60-second preview first and can unlock the " +
      "full track.",
  },
  {
    question: "Is Text to Emo free?",
    answer:
      "Generating songs is free, and every song includes a free 60-second " +
      `preview. New accounts get ${FREE_SONGS_ON_SIGNUP} free full songs. After ` +
      `that, unlocking a full song costs one credit: ${PRICE_SINGLE} for a ` +
      `single song, or down to ${PRICE_LOWEST_PER_SONG} per song in a credit ` +
      "pack. There's no subscription and credits never expire.",
  },
  {
    question: "What do the songs sound like?",
    answer:
      "Emo and pop punk. The male vocalist leans toward the sound of Fall Out " +
      "Boy, Green Day and My Chemical Romance; the female vocalist leans toward " +
      "Paramore, PVRIS and Avril Lavigne. Every song is original — inspired by " +
      "the genre, not a copy of any band.",
  },
  {
    question: "What can I make a song about?",
    answer:
      "Anything. Popular ideas are breakup songs, songs for a crush or best " +
      "friend, sad songs, funny diss tracks, and turning a real text message " +
      "into a song. The more specific your words, the more personal the lyrics.",
  },
  {
    question: "Can I download and share my song?",
    answer:
      "Yes. An unlocked song downloads as an MP3 with no watermark, so you can " +
      `post it on TikTok, Instagram or anywhere else. Download it within ` +
      `${AUDIO_RETENTION_DAYS} days — after that the file is removed from our ` +
      "servers, but the copy you saved is yours to keep.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes — a free account, using Google or a sign-in link sent to your email, " +
      "so your songs are saved to your library. No card is needed to start.",
  },
];
