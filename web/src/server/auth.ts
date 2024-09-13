import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type AuthOptions,
  type DefaultSession,
  type TokenSet,
} from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];

    id_token: string;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id_token: string;
    expires_at: number;
    refresh_token: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        return {
          ...token,
          id_token: account.id_token ?? "FUCK YOU",
          expires_at: account.expires_at ?? Date.now(),
          refresh_token: account.refresh_token ?? "FUCK YOU",
        };
      }

      if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      const response = await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        }),
        method: "POST",
      });

      let tokens: TokenSet;

      try {
        tokens = (await response.json()) as TokenSet;
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" as const };
      }

      if (!response.ok) throw tokens;

      return {
        ...token,
        id_token: tokens.id_token ?? "FUCK YOU",
        expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_at ?? 0)),
        refresh_token: tokens.refresh_token ?? token.refresh_token,
      };
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
      id_token: token.id_token,
    }),
  },
  // @ts-expect-error FUCK YOU
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
