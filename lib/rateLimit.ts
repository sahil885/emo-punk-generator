/**
 * Simple in-memory IP rate limiter.
 * Works perfectly for dev and single-instance deploys.
 * For Vercel production (multiple serverless instances) upgrade the store
 * to Vercel KV / Upstash Redis — the API stays identical.
 */

interface Entry {
  count: number;
  resetAt: number; // unix ms
}

const store = new Map<string, Entry>();

const LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = store.get(ip);

  // No entry yet, or the window expired — start fresh
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS };
  }

  // Already hit the limit
  if (entry.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  // Increment and allow
  entry.count++;
  return { allowed: true, remaining: LIMIT - entry.count, resetAt: entry.resetAt };
}
