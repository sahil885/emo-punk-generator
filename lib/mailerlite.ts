const ML_BASE = "https://connect.mailerlite.com/api";

// Upserts a subscriber and adds them to the configured group. Never throws —
// a MailerLite hiccup must not break sign-up. No-ops if env vars are unset.
export async function addSubscriberToGroup(
  email: string,
  name?: string | null
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) return;

  try {
    const res = await fetch(`${ML_BASE}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        ...(name ? { fields: { name } } : {}),
      }),
    });
    if (!res.ok) {
      console.error(
        "MailerLite subscribe failed:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (err) {
    console.error("MailerLite subscribe error:", err);
  }
}
