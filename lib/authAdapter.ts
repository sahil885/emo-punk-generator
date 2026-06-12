import type { Adapter } from "next-auth/adapters";
import { neon } from "@neondatabase/serverless";

export function NeonAdapter(): Adapter {
  const sql = neon(process.env.DATABASE_URL!);

  return {
    async createUser(data) {
      const rows = await sql`
        INSERT INTO users (name, email, "emailVerified", image)
        VALUES (${data.name ?? null}, ${data.email}, ${data.emailVerified ?? null}, ${data.image ?? null})
        ON CONFLICT (email) DO UPDATE
          SET name = EXCLUDED.name
        RETURNING *
      `;
      return rows[0] as never;
    },

    async getUser(id) {
      const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
      return (rows[0] as never) ?? null;
    },

    async getUserByEmail(email) {
      const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
      return (rows[0] as never) ?? null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const rows = await sql`
        SELECT u.* FROM users u
        JOIN accounts a ON u.id = a."userId"
        WHERE a.provider = ${provider} AND a."providerAccountId" = ${providerAccountId}
      `;
      return (rows[0] as never) ?? null;
    },

    async updateUser({ id, ...data }) {
      const rows = await sql`
        UPDATE users SET
          name            = COALESCE(${data.name ?? null}, name),
          "emailVerified" = COALESCE(${data.emailVerified ?? null}, "emailVerified"),
          image           = COALESCE(${data.image ?? null}, image)
        WHERE id = ${id}
        RETURNING *
      `;
      return rows[0] as never;
    },

    async deleteUser(userId) {
      await sql`DELETE FROM users WHERE id = ${userId}`;
    },

    async linkAccount(account) {
      await sql`
        INSERT INTO accounts (
          "userId", type, provider, "providerAccountId",
          refresh_token, access_token, expires_at, token_type,
          scope, id_token, session_state
        ) VALUES (
          ${account.userId}, ${account.type}, ${account.provider},
          ${account.providerAccountId}, ${account.refresh_token ?? null},
          ${account.access_token ?? null}, ${account.expires_at ?? null},
          ${account.token_type ?? null}, ${account.scope ?? null},
          ${account.id_token ?? null}, ${account.session_state ?? null}
        )
        ON CONFLICT DO NOTHING
      `;
      return account;
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await sql`
        DELETE FROM accounts
        WHERE provider = ${provider} AND "providerAccountId" = ${providerAccountId}
      `;
    },

    async createSession(session) {
      await sql`
        INSERT INTO sessions ("sessionToken", "userId", expires)
        VALUES (${session.sessionToken}, ${session.userId}, ${session.expires})
      `;
      return session;
    },

    async getSessionAndUser(sessionToken) {
      const rows = await sql`
        SELECT
          s."sessionToken", s."userId", s.expires,
          u.id  AS u_id,  u.name  AS u_name,
          u.email AS u_email, u."emailVerified" AS u_ev, u.image AS u_image
        FROM sessions s
        JOIN users u ON s."userId" = u.id
        WHERE s."sessionToken" = ${sessionToken} AND s.expires > NOW()
      `;
      if (!rows[0]) return null;
      const r = rows[0] as Record<string, unknown>;
      return {
        session: {
          sessionToken: r.sessionToken as string,
          userId: r.userId as string,
          expires: r.expires as Date,
        },
        user: {
          id: r.u_id as string,
          name: r.u_name as string | null,
          email: r.u_email as string,
          emailVerified: r.u_ev as Date | null,
          image: r.u_image as string | null,
        },
      };
    },

    async updateSession({ sessionToken, ...data }) {
      const rows = await sql`
        UPDATE sessions
        SET expires = COALESCE(${data.expires ?? null}, expires)
        WHERE "sessionToken" = ${sessionToken}
        RETURNING *
      `;
      return (rows[0] as never) ?? null;
    },

    async deleteSession(sessionToken) {
      await sql`DELETE FROM sessions WHERE "sessionToken" = ${sessionToken}`;
    },

    async createVerificationToken(token) {
      await sql`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires})
        ON CONFLICT DO NOTHING
      `;
      return token;
    },

    async useVerificationToken({ identifier, token }) {
      const rows = await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier} AND token = ${token}
        RETURNING *
      `;
      return (rows[0] as never) ?? null;
    },
  };
}
