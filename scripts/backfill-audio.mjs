#!/usr/bin/env node
// One-off: copy songs that are still alive on the generator's CDN into our own
// storage, so they stop expiring.
//
// Only songs whose source URL still responds can be saved — anything already
// deleted is gone for good. Unlocked songs go first: those are the ones people
// spent a credit on.
//
//   node scripts/backfill-audio.mjs --dry-run     show what would be copied
//   node scripts/backfill-audio.mjs               copy them
//   node scripts/backfill-audio.mjs --unlocked    unlocked songs only
//
// Safe to re-run: songs already stored are skipped, and the blob path is
// derived from the song id, so a retry overwrites rather than duplicating.

import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes("--dry-run");
const UNLOCKED_ONLY = argv.includes("--unlocked");

const env = readFileSync(".env.local", "utf8");
const readEnv = (key) => {
  const m = env.match(new RegExp(`^${key}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
};

const sql = neon(readEnv("DATABASE_URL"));
const token = process.env.BLOB_READ_WRITE_TOKEN || readEnv("BLOB_READ_WRITE_TOKEN");
if (!token && !DRY_RUN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set — run with --dry-run or add the token.");
  process.exit(1);
}

const STORED = "%.public.blob.vercel-storage.com/%";

const rows = await sql`
  SELECT id, title, audio_url, unlocked, created_at
  FROM songs
  WHERE audio_url IS NOT NULL
    AND audio_url NOT LIKE ${STORED}
  ORDER BY unlocked DESC, created_at DESC
`;

const candidates = UNLOCKED_ONLY ? rows.filter((r) => r.unlocked) : rows;
console.log(
  `${rows.length} songs still on the generator's CDN` +
    (UNLOCKED_ONLY ? `, ${candidates.length} of them unlocked` : "")
);

let copied = 0;
let gone = 0;
let failed = 0;
let bytes = 0;

for (const song of candidates) {
  // Is the source still there?
  let alive = false;
  let size = 0;
  try {
    const probe = await fetch(song.audio_url, { headers: { Range: "bytes=0-0" } });
    alive = probe.status < 400;
    const cr = probe.headers.get("content-range");
    if (cr) size = Number(cr.split("/")[1] ?? 0);
  } catch {
    alive = false;
  }

  const label = `${song.unlocked ? "unlocked" : "preview "} ${String(song.title).slice(0, 38)}`;
  if (!alive) {
    gone++;
    console.log(`  gone     ${label}`);
    continue;
  }

  if (DRY_RUN) {
    copied++;
    bytes += size;
    console.log(`  would copy ${label} (${(size / 1048576).toFixed(1)}MB)`);
    continue;
  }

  try {
    const res = await fetch(song.audio_url);
    if (!res.ok || !res.body) throw new Error(`source responded ${res.status}`);
    const blob = await put(`songs/${song.id}.mp3`, res.body, {
      access: "public",
      contentType: "audio/mpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    await sql`UPDATE songs SET audio_url = ${blob.url} WHERE id = ${song.id}`;
    copied++;
    bytes += size;
    console.log(`  copied   ${label}`);
  } catch (err) {
    failed++;
    console.log(`  FAILED   ${label}: ${err.message}`);
  }
}

console.log(
  `\n${DRY_RUN ? "would copy" : "copied"}: ${copied} (${(bytes / 1048576).toFixed(1)}MB)` +
    ` | already gone: ${gone} | failed: ${failed}`
);
