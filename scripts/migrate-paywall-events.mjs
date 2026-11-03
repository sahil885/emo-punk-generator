#!/usr/bin/env node
// One-off: create the paywall_events table that lib/paywallEvents.ts writes to.
//
//   node scripts/migrate-paywall-events.mjs
//
// Additive only — a new table and index, nothing existing is touched. Safe to
// re-run. Until it has run, events are simply not recorded (the insert fails,
// is logged, and unlock/checkout carry on as normal).

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const env = readFileSync(".env.local", "utf8");
const sql = neon(env.match(/^DATABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g, ""));

await sql`
  CREATE TABLE IF NOT EXISTS paywall_events (
    id         bigserial PRIMARY KEY,
    "userId"   text,
    event      text NOT NULL,
    source     text,
    pack       text,
    song_id    text,
    created_at timestamptz NOT NULL DEFAULT now()
  )
`;
await sql`
  CREATE INDEX IF NOT EXISTS paywall_events_event_created_idx
    ON paywall_events (event, created_at)
`;

const cols = await sql`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'paywall_events' ORDER BY ordinal_position
`;
console.log(`paywall_events ready: ${cols.map((c) => c.column_name).join(", ")}`);
