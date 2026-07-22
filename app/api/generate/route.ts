import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

// Daily generation caps. Generation is free (you get a preview); credits are
// spent to unlock the full song. The cap protects against runaway Suno usage by
// free users — but customers who hold credits are paying users and shouldn't be
// throttled at the free-tier limit, so they get a much higher (still bounded) cap.
const FREE_DAILY_LIMIT = 10;
const CREDITED_DAILY_LIMIT = 50;

export async function POST(req: NextRequest) {
  // ── Login required to generate ──────────────────────────────────────
  const session = await auth();
  const userEmail = session?.user?.email ?? null;
  if (!userEmail) {
    return NextResponse.json(
      { error: "Sign in to generate a song.", needsAuth: true },
      { status: 401 }
    );
  }

  const users = await sql`SELECT id, credits FROM users WHERE email = ${userEmail}`;
  const user = users[0] as { id: string; credits: number } | undefined;
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ── Per-user daily generation cap ──────────────────────────────────
  // Paying users (those holding credits) get the higher cap.
  const dailyLimit = user.credits > 0 ? CREDITED_DAILY_LIMIT : FREE_DAILY_LIMIT;
  const recent = await sql`
    SELECT count(*)::int AS n FROM songs
    WHERE "userId" = ${user.id} AND created_at > now() - interval '24 hours'
  `;
  const usedToday = (recent[0] as { n: number }).n;
  if (usedToday >= dailyLimit) {
    return NextResponse.json(
      {
        error: `You've hit today's limit of ${dailyLimit} songs. Come back tomorrow 🎸`,
        rateLimited: true,
      },
      { status: 429 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────
  const { words, singer } = await req.json();
  // CLAUDE_API_KEY fallback: the system shell exports an empty ANTHROPIC_API_KEY
  // that shadows the .env.local value
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

  if (!words || words.trim().length === 0) {
    return NextResponse.json({ error: "No words provided" }, { status: 400 });
  }

  const singerDescription =
    singer === "female"
      ? "female vocalist in the style of Hayley Williams (Paramore), Lynn Gunn (PVRIS), or Avril Lavigne"
      : "male vocalist in the style of Pete Wentz/Patrick Stump (Fall Out Boy), Billie Joe Armstrong (Green Day), or Oli Sykes (BMTH)";

  const prompt = `You are an emo pop punk songwriter. Transform the following words or phrase into a complete emo pop punk song.

User's words: "${words}"
Singer style: ${singerDescription}

Write a full song with these exact sections, labeled clearly:
[VERSE 1]
[PRE-CHORUS]
[CHORUS]
[VERSE 2]
[PRE-CHORUS]
[CHORUS]
[BRIDGE]
[FINAL CHORUS]

Rules:
- Emo pop punk style: angst, heartbreak, defiance, raw emotion, suburban teenage pain
- Rhyme scheme should feel natural, not forced
- Chorus should be anthemic and repeatable
- Use the user's words/theme as the emotional core
- Bridge should be the emotional climax — more intense or stripped back
- Keep it authentic to the genre: references to late nights, driving, screaming, falling apart, holding on
- Song title should be dramatic and emo (output it as: TITLE: "Song Title Here" on the very first line)

Output format:
TITLE: "Song Title Here"

[VERSE 1]
lyrics here...

[PRE-CHORUS]
lyrics here...

etc.`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
    }

    const text = content.text;
    const titleMatch = text.match(/TITLE:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : "Untitled";
    const lyrics = text.replace(/TITLE:\s*"[^"]+"\n?/, "").trim();

    // Save the generation to the user's library as a locked preview. No credit
    // is charged here — the credit is spent later to unlock the full song.
    const saved = await sql`
      INSERT INTO songs ("userId", title, lyrics, singer, unlocked)
      VALUES (${user.id}, ${title}, ${lyrics}, ${singer === "female" ? "female" : "male"}, false)
      RETURNING id
    `;
    const songId = (saved[0] as { id: string }).id;

    return NextResponse.json({
      title,
      lyrics,
      singer,
      songId,
      creditsRemaining: user.credits,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate song" }, { status: 500 });
  }
}
