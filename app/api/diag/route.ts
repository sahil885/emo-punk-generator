import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// TEMPORARY diagnostic — reports which DB production is using and whether the
// auth schema exists. Remove once the OAuth issue is fixed.
export async function GET() {
  const out: Record<string, unknown> = { marker: "diag-v3" };
  try {
    const db = await sql`SELECT current_database() AS db`;
    out.database = (db[0] as { db: string }).db;
  } catch (e) {
    out.databaseError = String((e as Error)?.message ?? e);
  }
  try {
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name
    `;
    out.tables = (tables as { table_name: string }[]).map((t) => t.table_name);
  } catch (e) {
    out.tablesError = String((e as Error)?.message ?? e);
  }
  try {
    const u = await sql`SELECT count(*)::int AS n FROM users`;
    out.userCount = (u[0] as { n: number }).n;
  } catch (e) {
    out.usersError = String((e as Error)?.message ?? e);
  }
  // DATABASE_URL host only (no credentials) so we can compare to local
  const url = process.env.DATABASE_URL ?? "";
  out.dbHost = url.replace(/^.*@/, "").replace(/\/.*$/, "") || "(unset)";
  return NextResponse.json(out);
}
