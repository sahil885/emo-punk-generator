import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { after } from "next/server";
import { NeonAdapter } from "@/lib/authAdapter";
import { addSubscriberToGroup } from "@/lib/mailerlite";
import { sql } from "@/lib/db";

// TEMPORARY: capture the auth error + cause chain to diagnose the magic-link
// send failure in production. Remove once fixed.
function serializeAuthError(e: unknown, depth = 0): unknown {
  if (e == null || depth > 6) return null;
  if (typeof e !== "object") return String(e);
  const err = e as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  if (err.name !== undefined) out.name = err.name;
  if (err.message !== undefined) out.message = err.message;
  for (const k of ["error", "error_description", "code", "status", "statusCode", "name"]) {
    if (err[k] !== undefined) out[k] = err[k];
  }
  if (err.cause) out.cause = serializeAuthError(err.cause, depth + 1);
  if (err.err) out.err = serializeAuthError(err.err, depth + 1);
  return out;
}

// Build the provider list defensively: only enable Google once its
// credentials are configured, so a missing env var can't break the
// entire auth route (and therefore the whole deployment).
const providers: Provider[] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      // Safe here: Google verifies email ownership, and magic-link users
      // verified the same address — lets one account use both methods
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Tolerate a pasted "AUTH_RESEND_KEY=" prefix / surrounding quotes / whitespace,
// the same paste mistake that broke DATABASE_URL.
const resendApiKey = (process.env.AUTH_RESEND_KEY ?? "")
  .trim()
  .replace(/^\s*AUTH_RESEND_KEY\s*=\s*/i, "")
  .replace(/^["']|["']$/g, "")
  .trim();

providers.push(
  Resend({
    apiKey: resendApiKey,
    from: "Text to Emo <noreply@texttoemo.com>",
  })
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NeonAdapter(),
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) session.user.email = token.email as string;
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    verifyRequest: "/",
    error: "/",
  },
  events: {
    // Fires once when a new user is created (Google or magic link) —
    // add them to the MailerLite "Text To Emo" group.
    async createUser({ user }) {
      if (user.email) await addSubscriberToGroup(user.email, user.name);
    },
  },
  // TEMPORARY: write auth errors to auth_debug to diagnose the magic-link send.
  logger: {
    error(error) {
      try {
        const blob = JSON.stringify(serializeAuthError(error));
        after(async () => {
          try {
            await sql`INSERT INTO auth_debug (detail) VALUES (${blob})`;
          } catch {
            /* ignore */
          }
        });
      } catch {
        /* never let logging break auth */
      }
      console.error("[auth][error]", error);
    },
  },
});
