import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

export async function GET() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const songs = await sql`
    SELECT s.id, s.title, s.lyrics, s.singer, s.audio_url, s.image_url, s.duration, s.created_at
    FROM songs s
    JOIN users u ON u.id = s."userId"
    WHERE u.email = ${userEmail}
    ORDER BY s.created_at DESC
  `;

  return NextResponse.json({ songs });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await sql`
    DELETE FROM songs
    WHERE id = ${id}
      AND "userId" = (SELECT id FROM users WHERE email = ${userEmail})
  `;

  return NextResponse.json({ ok: true });
}
