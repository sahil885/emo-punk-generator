#!/usr/bin/env node
// One-off: add the two columns the "your song is ready" email needs.
//
//   node scripts/migrate-song-ready-email.mjs
//
// Additive only — two nullable columns on songs, nothing existing changes.
// Safe to re-run. Run it BEFORE deploying the code that uses them.
//
//   last_polled_at       stamped each time an open tab polls a song's status,
//                        so we can tell whether anyone was there when it finished
//   ready_email_sent_at  set when the email goes out, so it's sent at most once

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const env = readFileSync(".env.local", "utf8");
const sql = neon(env.match(/^DATABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g, ""));

await sql`ALTER TABLE songs ADD COLUMN IF NOT EXISTS last_polled_at timestamptz`;
await sql`ALTER TABLE songs ADD COLUMN IF NOT EXISTS ready_email_sent_at timestamptz`;
await sql`CREATE INDEX IF NOT EXISTS songs_ready_email_idx ON songs ("userId", ready_email_sent_at)`;

const cols = await sql`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'songs' AND column_name IN ('last_polled_at', 'ready_email_sent_at')
`;
console.log(`songs columns ready: ${cols.map((c) => c.column_name).join(", ")}`);
