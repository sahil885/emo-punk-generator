#!/usr/bin/env node
// Paywall funnel: where between sign-up and payment people stop.
//
//   node scripts/paywall-report.mjs            last 30 days
//   node scripts/paywall-report.mjs 2026-11-01 since a date
//
// Counts distinct people at each step, so one person opening the buy screen
// five times is one person. The site owner's own accounts are excluded.

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const INTERNAL = ["sahilbora885@gmail.com", "sahil885@hotmail.com", "yoshee08@gmail.com"];

const env = readFileSync(".env.local", "utf8");
const sql = neon(env.match(/^DATABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g, ""));

const arg = process.argv[2];
const since = arg ? new Date(arg) : new Date(Date.now() - 30 * 86400000);
if (Number.isNaN(since.getTime())) {
  console.error(`Not a date: ${arg}`);
  process.exit(1);
}

const people = async (query) => (await query)[0].n;

const signups = await people(sql`
  SELECT COUNT(*)::int n FROM users
  WHERE created_at >= ${since} AND email <> ALL(${INTERNAL})`);

const generated = await people(sql`
  SELECT COUNT(DISTINCT s."userId")::int n FROM songs s JOIN users u ON u.id = s."userId"
  WHERE s.created_at >= ${since} AND u.email <> ALL(${INTERNAL})`);

const byEvent = async (event) =>
  people(sql`
    SELECT COUNT(DISTINCT e."userId")::int n FROM paywall_events e JOIN users u ON u.id = e."userId"
    WHERE e.event = ${event} AND e.created_at >= ${since} AND u.email <> ALL(${INTERNAL})`);

const triedUnlock = await byEvent("unlock_no_credits");
const sawPrices = await byEvent("buy_modal_open");
const startedCheckout = await byEvent("checkout_started");

const paid = await sql`
  SELECT COUNT(DISTINCT p."userId")::int n, COALESCE(SUM(p.amount_cents), 0)::int cents
  FROM purchases p JOIN users u ON u.id = p."userId"
  WHERE p.created_at >= ${since} AND u.email <> ALL(${INTERNAL})`;

const sources = await sql`
  SELECT e.source, COUNT(DISTINCT e."userId")::int n FROM paywall_events e
  JOIN users u ON u.id = e."userId"
  WHERE e.event = 'buy_modal_open' AND e.created_at >= ${since} AND u.email <> ALL(${INTERNAL})
  GROUP BY e.source ORDER BY n DESC`;

// `of` names what the percentage is of, since the buy screen can be opened
// without trying an unlock first (header button, offer banner).
const row = (label, n, base, of) =>
  console.log(
    `  ${label.padEnd(36)} ${String(n).padStart(4)}` +
      (of ? `   ${base ? Math.round((n / base) * 100) : 0}% of ${of}` : "")
  );

console.log(`Paywall funnel since ${since.toISOString().slice(0, 10)} (people, excl. your accounts)\n`);
row("Signed up", signups);
row("Generated a song", generated, signups, "sign-ups");
row("Tried to unlock with no credits", triedUnlock, generated, "generated");
row("Saw the credit-pack screen", sawPrices, generated, "generated");
row("Clicked Continue → Stripe", startedCheckout, sawPrices, "saw prices");
row("Paid", paid[0].n, startedCheckout, "clicked Continue");
console.log(`\n  revenue: $${(paid[0].cents / 100).toFixed(2)}`);
if (sources.length) {
  console.log("\n  credit-pack screen opened from:");
  for (const s of sources) console.log(`    ${String(s.source).padEnd(14)} ${s.n}`);
}
