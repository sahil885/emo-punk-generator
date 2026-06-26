import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

// Spend 1 credit to unlock the full song + download for a song the user owns.
// Idempotent: unlocking an already-unlocked song does not charge again.
export async function POST(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { songId } = await req.json();
  if (!songId) {
    return NextResponse.json({ error: "Missing songId" }, { status: 400 });
  }

  const rows = await sql`
    SELECT s.id, s.unlocked, u.credits
    FROM songs s
    JOIN users u ON u.id = s."userId"
    WHERE s.id = ${songId} AND u.email = ${userEmail}
  `;
  const song = rows[0] as { id: string; unlocked: boolean; credits: number } | undefined;
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  if (song.unlocked) {
    return NextResponse.json({ ok: true, alreadyUnlocked: true, creditsRemaining: song.credits });
  }

  if (song.credits <= 0) {
    return NextResponse.json(
      { error: "No credits left. Buy a credit pack to unlock songs! 🎸", noCredits: true },
      { status: 402 }
    );
  }

  // Deduct a credit (guarded so a concurrent request can't overspend), then unlock.
  const deducted = await sql`
    UPDATE users SET credits = credits - 1
    WHERE email = ${userEmail} AND credits > 0
    RETURNING credits
  `;
  if (deducted.length === 0) {
    return NextResponse.json(
      { error: "No credits left. Buy a credit pack to unlock songs! 🎸", noCredits: true },
      { status: 402 }
    );
  }

  await sql`UPDATE songs SET unlocked = true WHERE id = ${songId}`;

  const creditsRemaining = (deducted[0] as { credits: number }).credits;
  return NextResponse.json({ ok: true, creditsRemaining });
}
