import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const audioUrl = req.nextUrl.searchParams.get("url");
  const songTitle = req.nextUrl.searchParams.get("title") ?? "emo-punk-song";

  if (!audioUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Fetch the audio from Suno server-side
  const audioRes = await fetch(audioUrl);
  if (!audioRes.ok) {
    return NextResponse.json({ error: "Failed to fetch audio" }, { status: 502 });
  }

  // Sanitise the title for use as a filename (strip chars that break filenames)
  const safeTitle = songTitle.replace(/[/\\?%*:|"<>]/g, "").trim() || "emo-punk-song";
  const filename = `${safeTitle}.mp3`;

  return new NextResponse(audioRes.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${filename}"`,
      // Forward the content-length if Suno sends it so the browser shows progress
      ...(audioRes.headers.get("content-length")
        ? { "Content-Length": audioRes.headers.get("content-length")! }
        : {}),
    },
  });
}
