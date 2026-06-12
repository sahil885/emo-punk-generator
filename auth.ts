import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { NeonAdapter } from "@/lib/authAdapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NeonAdapter(),
  providers: [
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
