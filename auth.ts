import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { NeonAdapter } from "@/lib/authAdapter";
import { addSubscriberToGroup } from "@/lib/mailerlite";

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

providers.push(
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
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
});
