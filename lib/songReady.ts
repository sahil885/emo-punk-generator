import { createHmac } from "node:crypto";
import { sql } from "@/lib/db";
import { getFinishedSunoTrack } from "@/lib/suno";
import { attachSongAudio } from "@/lib/songAudio";
import { escapeHtml, sendEmail } from "@/lib/email";
import { PACKS } from "@/lib/pricing";
import { PREVIEW_RETENTION_DAYS } from "@/lib/retention";
import { SITE_URL } from "@/lib/about";

// "Your song is ready" email for people who left before their song finished.
//
// Generation takes about two minutes, and until Nov 2026 audio was only saved
// while the browser tab kept polling — close the tab and the song sat at Suno,
// unheard, with no unlock button ever shown (5 of 41 song-makers since August
// never heard a single song). Now Suno calls us back when a task completes
// (/api/audio/callback), with a daily sweep as a backstop, and this decides
// whether the person is still on the page or needs an email.

// The open tab polls /api/audio/status every 5s and each poll stamps
// songs.last_polled_at. Background tabs get throttled, so allow well over 5s
// before deciding nobody is there.
const AWAY_AFTER_SECONDS = 45;

// One email per person per 12 hours: someone who makes five songs and leaves
// gets one nudge, not five.
const PER_USER_COOLDOWN_HOURS = 12;

// The daily sweep can find songs that finished long ago. Emailing about a song
// from last month is noise, so only recent songs qualify.
export const EMAIL_MAX_AGE_HOURS = 48;

// Signs the callback URL we hand Suno, so random POSTs to the callback route
// are rejected before they cost a Suno API call. Derived from AUTH_SECRET so
// there's no new env var to set.
export function callbackSignature(): string {
  return createHmac("sha256", process.env.AUTH_SECRET ?? "")
    .update("suno-callback")
    .digest("hex")
    .slice(0, 32);
}

export function sunoCallbackUrl(): string {
  return `${SITE_URL}/api/audio/callback?sig=${callbackSignature()}`;
}

export type FinishResult = "not_ours" | "not_finished" | "already_saved" | "saved" | "saved_and_emailed";

// Idempotent: safe to call from the callback (Suno sends several per task) and
// again from the sweep.
export async function finishSongTask(taskId: string): Promise<FinishResult> {
  const known = await sql`SELECT 1 FROM songs WHERE task_id = ${taskId} LIMIT 1`;
  if (known.length === 0) return "not_ours";

  // Never trust the callback body — ask Suno ourselves.
  const track = await getFinishedSunoTrack(taskId);
  if (!track?.audioUrl) return "not_finished";

  const attached = await attachSongAudio(taskId, track);
  if (!attached) return "already_saved";

  return (await emailIfAway(taskId)) ? "saved_and_emailed" : "saved";
}

// Claims the email atomically (ready_email_sent_at), so the callback and the
// sweep can't both send it. Only fires when the person had left the page, the
// song is recent and still locked, and they haven't had one recently.
async function emailIfAway(taskId: string): Promise<boolean> {
  const claimed = await sql`
    UPDATE songs s
    SET ready_email_sent_at = now()
    FROM users u
    WHERE s.task_id = ${taskId}
      AND u.id = s."userId"
      AND s.ready_email_sent_at IS NULL
      AND s.unlocked = false
      AND s.created_at > now() - make_interval(hours => ${EMAIL_MAX_AGE_HOURS})
      AND (s.last_polled_at IS NULL
           OR s.last_polled_at < now() - make_interval(secs => ${AWAY_AFTER_SECONDS}))
      AND NOT EXISTS (
        SELECT 1 FROM songs o
        WHERE o."userId" = s."userId"
          AND o.ready_email_sent_at > now() - make_interval(hours => ${PER_USER_COOLDOWN_HOURS})
      )
    RETURNING s.id, s.title, u.email
  `;
  const song = claimed[0] as { id: string; title: string | null; email: string } | undefined;
  if (!song?.email) return false;

  const sent = await sendEmail({ to: song.email, ...songReadyEmail(song.id, song.title) });
  if (!sent) {
    // Release the claim so the daily sweep can try again.
    await sql`UPDATE songs SET ready_email_sent_at = NULL WHERE id = ${song.id}`;
  }
  return sent;
}

export function songReadyEmail(songId: string, rawTitle: string | null) {
  const title = (rawTitle ?? "").trim() || "Your song";
  const link = `${SITE_URL}/?song=${encodeURIComponent(songId)}`;
  const price = PACKS["1pack"].price;
  const t = escapeHtml(title);

  const text = [
    `"${title}" is finished.`,
    "",
    "You left before it was done, so here it is:",
    link,
    "",
    `The 60-second preview is free. If it's the one, unlock the full track for ${price} — it's yours to download and keep.`,
    "",
    "— Text to Emo",
    "",
    `You're getting this because you made a song on texttoemo.com. Previews you don't unlock are cleared after ${PREVIEW_RETENTION_DAYS} days.`,
  ].join("\n");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0208;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0208;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#0f0520;border:1px solid #3a1a55;border-radius:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ffffff;">
<tr><td style="padding:32px 24px;">
<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff2d78;">Your song is ready</p>
<h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;font-weight:900;color:#ffffff;">&ldquo;${t}&rdquo;</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.5;color:#d9d0e3;">You left before it was done, so here it is.</p>
<a href="${link}" style="display:inline-block;background:#ff2d78;background-image:linear-gradient(90deg,#ff2d78,#9b30ff);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 24px;border-radius:12px;">&#9654; Hear your song</a>
<p style="margin:24px 0 0;font-size:14px;line-height:1.5;color:#b8adc6;">The 60-second preview is free. If it&rsquo;s the one, unlock the full track for ${price} &mdash; it&rsquo;s yours to download and keep.</p>
<p style="margin:24px 0 0;font-size:14px;color:#b8adc6;">&mdash; Text to Emo</p>
</td></tr>
</table>
<p style="max-width:480px;margin:16px auto 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#6f6680;">You&rsquo;re getting this because you made a song on texttoemo.com. Previews you don&rsquo;t unlock are cleared after ${PREVIEW_RETENTION_DAYS} days.</p>
</td></tr>
</table>
</body></html>`;

  return { subject: "Your song is ready 🎸", html, text };
}
