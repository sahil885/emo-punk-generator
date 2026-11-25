// Transactional email through Resend — the same account and sender the
// magic-link sign-in uses (auth.ts), called over its REST API so no SDK is
// needed.

const FROM = "Text to Emo <noreply@texttoemo.com>";

// Tolerate the same paste mistakes auth.ts does: a "AUTH_RESEND_KEY=" prefix,
// surrounding quotes, stray whitespace.
function resendKey(): string {
  return (process.env.AUTH_RESEND_KEY ?? "")
    .trim()
    .replace(/^\s*AUTH_RESEND_KEY\s*=\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const key = resendKey();
  if (!key) {
    console.error("sendEmail: AUTH_RESEND_KEY is not set");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, ...input }),
    });
    if (!res.ok) {
      console.error(`sendEmail: Resend ${res.status}`, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendEmail failed", err);
    return false;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
