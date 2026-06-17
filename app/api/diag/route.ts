import { NextResponse } from "next/server";

// TEMPORARY: confirm the MailerLite env vars are set correctly in production
// and that the key works from prod. Returns no secrets. Remove after verifying.
export async function GET() {
  const key = process.env.MAILERLITE_API_KEY;
  const grp = process.env.MAILERLITE_GROUP_ID;
  const out: Record<string, unknown> = {
    marker: "ml-diag",
    keyPresent: !!key,
    keyLength: key?.length ?? 0,
    groupId: grp ?? null,
  };
  if (key && grp) {
    try {
      const r = await fetch(`https://connect.mailerlite.com/api/groups/${grp}`, {
        headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
      });
      out.mailerliteStatus = r.status;
      const j = (await r.json().catch(() => ({}))) as { data?: { name?: string } };
      out.groupName = j?.data?.name ?? null;
    } catch (e) {
      out.mailerliteError = String((e as Error)?.message ?? e);
    }
  }
  return NextResponse.json(out);
}
