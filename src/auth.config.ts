import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnVisualizers = nextUrl.pathname.endsWith("dashboard");
      console.log("Not logged in, redirecting to login page");
      if (isOnVisualizers) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/es", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
