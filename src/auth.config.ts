import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnVisualizers = nextUrl.pathname.endsWith("/visualizers");
      if (isOnVisualizers) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/es", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
