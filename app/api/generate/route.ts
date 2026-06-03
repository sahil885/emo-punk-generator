import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { words, singer } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

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

    return NextResponse.json({ title, lyrics, singer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate song" }, { status: 500 });
  }
}
