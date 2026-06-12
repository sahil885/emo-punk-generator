import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { NeonAdapter } from "@/lib/authAdapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NeonAdapter(),
  providers: [
    Google({
      // Safe here: Google verifies email ownership, and magic-link users
      // verified the same address — lets one account use both methods
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      // TODO: replace with your verified Resend domain, e.g. "EMO PUNK AI <noreply@yourdomain.com>"
      from: "EMO PUNK AI <onboarding@resend.dev>",
    }),
  ],
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
});
