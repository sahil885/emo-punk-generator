#!/usr/bin/env node
// Debug helper: show one song's generation state by title.
//   node scripts/check-song.mjs "Song title"
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
const env = readFileSync(".env.local", "utf8");
const sql = neon(env.match(/^DATABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g, ""));
const rows = await sql`
  SELECT id, created_at, task_id, audio_url IS NOT NULL AS has_audio, last_polled_at, ready_email_sent_at, unlocked
  FROM songs WHERE title = ${process.argv[2]} ORDER BY created_at DESC LIMIT 3`;
console.log(rows);
