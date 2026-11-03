import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { isModalSource, recordPaywallEvent } from "@/lib/paywallEvents";

// POST /api/paywall-event — the browser reports that the credit-pack screen
// opened, and from where. The other paywall events are recorded server-side
// where they happen (/api/unlock, /api/checkout/credits); this is the one
// moment only the browser sees.
//
// Signed-in only (the buy screen is never shown to anyone else), and the source
// must be one of the known places, so the table can't be filled with noise.
export async function POST(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return new NextResponse(null, { status: 401 });

  const { source } = (await req.json().catch(() => ({}))) as { source?: unknown };
  if (!isModalSource(source)) {
    return NextResponse.json({ error: "Unknown source" }, { status: 400 });
  }

  await recordPaywallEvent({ email, event: "buy_modal_open", source });
  return new NextResponse(null, { status: 204 });
}
