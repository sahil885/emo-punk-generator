# Deploying texttoemo.com

Step-by-step launch checklist. Do these **in order** — each phase unblocks the next.
Domain: **texttoemo.com** (registered at IONOS). Host: **Vercel**.

> ⚠️ Never paste real secret values into this file — it's in a public repo.
> Secrets live only in Vercel's Environment Variables UI and your local `.env.local`.

---

## Phase 1 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project** → import `sahil885/emo-punk-generator`.
3. Framework preset auto-detects **Next.js**. Leave build settings default.
4. Before clicking Deploy, expand **Environment Variables** and add each of these
   (copy the values from your local `.env.local`):

   | Variable | Notes |
   |---|---|
   | `ANTHROPIC_API_KEY` | Claude API key |
   | `SUNO_API_KEY` | Suno API key |
   | `STRIPE_SECRET_KEY` | live `sk_live_...` |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | live `pk_live_...` |
   | `DATABASE_URL` | Neon connection string |
   | `AUTH_SECRET` | same as local |
   | `AUTH_URL` | **set to `https://texttoemo.com`** (NOT localhost) |
   | `AUTH_RESEND_KEY` | Resend API key |
   | `STRIPE_WEBHOOK_SECRET` | leave as `whsec_placeholder` for now → real value in Phase 5 |

   Skip `CLAUDE_API_KEY` — that was only a workaround for a local shell quirk; Vercel doesn't need it.
   `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` come in Phase 4.

5. **Deploy.** You'll get a `*.vercel.app` URL. Confirm the site loads (sign-in won't fully
   work until the domain + Resend are wired up — that's expected).

---

## Phase 2 — Connect texttoemo.com (Vercel + IONOS)

1. In Vercel: **Project → Settings → Domains → Add** → enter `texttoemo.com`.
   Add `www.texttoemo.com` too and let Vercel redirect one to the other.
2. Vercel shows you the exact DNS records to create. **Use the values Vercel displays**
   (they occasionally change) — typically:
   - **A record** — Host/Name `@` → the IP Vercel shows (e.g. `76.76.21.21`)
   - **CNAME** — Host/Name `www` → `cname.vercel-dns.com`
3. In **IONOS → Domains → texttoemo.com → DNS**:
   - IONOS may have default records on `@` and `www` — edit/replace them with Vercel's values.
   - Save. Propagation is usually minutes, up to a few hours.
4. Back in Vercel, the domain flips to **Valid / HTTPS issued** once DNS resolves.
5. Confirm `AUTH_URL=https://texttoemo.com` is set (Phase 1). If you change it,
   **redeploy** for it to take effect.

---

## Phase 3 — Verify the domain in Resend (fixes magic-link email)

Until this is done, magic-link sign-in emails only deliver to the Resend account owner.

1. [resend.com/domains](https://resend.com/domains) → **Add Domain** → `texttoemo.com`.
2. Resend generates a set of records (an **MX**, an **SPF TXT**, and **DKIM** records).
   Add each one in **IONOS → DNS** exactly as shown (Host + Type + Value).
3. Click **Verify** in Resend. Once green, tell me — I'll change one line in
   `auth.ts` so emails send from `noreply@texttoemo.com` instead of the test address.

---

## Phase 4 — Google Sign-In

1. [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
   → create a project if needed → configure the OAuth consent screen (External, app name
   "Text to Emo", your email; you can skip scopes/test users).
2. **Create Credentials → OAuth client ID → Web application.**
   - **Authorized JavaScript origins:**
     - `https://texttoemo.com`
     - `http://localhost:3000` (for local dev)
   - **Authorized redirect URIs:**
     - `https://texttoemo.com/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google`
3. Copy the Client ID + Secret into **Vercel env vars**:
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` → **redeploy**.
   (Also add them to local `.env.local` to test Google sign-in on localhost.)

---

## Phase 5 — Stripe Webhook (purchase safety net)

Purchases already fulfill via the verify-on-return flow, but the webhook covers the
edge case where a buyer closes the tab during the Stripe redirect.

1. [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
   → **Add endpoint** → `https://texttoemo.com/api/webhook`.
2. Select event **`checkout.session.completed`**.
3. Copy the **Signing secret** (`whsec_...`) → set `STRIPE_WEBHOOK_SECRET` in Vercel
   (replace the placeholder) → **redeploy**.

---

## Post-launch (not blocking, but do soon)

- **Production rate limiting** — the free-tier "3 songs/day" cap is in-memory and resets
  per serverless instance on Vercel, so it's bypassable. Swap `lib/rateLimit.ts` to
  Upstash Redis (free tier). The function signature stays identical.
- **Durable audio storage** — Suno's MP3 URLs expire, so saved library songs will
  eventually 404. Copy MP3s to S3/Cloudflare R2 on purchase for a true "saved forever".
- **Heads-up: live Stripe keys.** Every test purchase charges a real card. Use a real
  card and refund yourself, or temporarily swap in Stripe **test** keys to rehearse.

---

## Quick reference — what depends on what

```
texttoemo.com (done ✅)
  ├─ Phase 1: Vercel deploy
  ├─ Phase 2: DNS → domain live + HTTPS
  ├─ Phase 3: Resend records → magic-link email works   ← critical
  ├─ Phase 4: Google OAuth (uses prod domain in redirect URI)
  └─ Phase 5: Stripe webhook (uses prod domain in endpoint)
```
