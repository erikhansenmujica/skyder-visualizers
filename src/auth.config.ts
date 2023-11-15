import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.endsWith("dashboard");
      const isOnLogin = nextUrl.pathname.endsWith("login");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(
          new URL("/login", "https://app.skyderdigital.com")
        );
      } else if (isOnLogin) {
        if (isLoggedIn)
          return Response.redirect(
            new URL("/dashboard", "https://app.skyderdigital.com")
          );
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
