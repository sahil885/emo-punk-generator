import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { getActiveOffer } from "@/lib/offer";

/** GET /api/credits — the signed-in user's credit balance and any live offer */
export async function GET() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ credits: null, signedIn: false, offer: null });
  }

  const [rows, offer] = await Promise.all([
    sql`SELECT credits FROM users WHERE email = ${email}`,
    getActiveOffer(email),
  ]);
  const credits = (rows[0] as { credits: number } | undefined)?.credits ?? 0;

  return NextResponse.json({ credits, signedIn: true, offer });
}
