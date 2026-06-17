import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// TEMPORARY diagnostic endpoint — remove with the auth_debug logger.
export async function GET() {
  const rows = await sql`
    SELECT detail, created_at FROM auth_debug ORDER BY id DESC LIMIT 5
  `;
  return NextResponse.json({ marker: "authdebug-v1", rows });
}
