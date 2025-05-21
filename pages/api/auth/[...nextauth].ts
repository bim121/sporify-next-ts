// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: any) {
  const Backend_URL = "http://localhost:5000";
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const Backend_URL = "http://localhost:5000";
        if (!credentials?.username || !credentials?.password) return null;

        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session }: any) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
});
