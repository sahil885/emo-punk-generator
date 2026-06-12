import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

/** GET /api/credits — returns the signed-in user's credit balance */
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ credits: null, signedIn: false });
  }

  const rows = await sql`
    SELECT credits FROM users WHERE email = ${session.user.email}
  `;
  const credits = (rows[0] as { credits: number } | undefined)?.credits ?? 0;

  return NextResponse.json({ credits, signedIn: true });
}
