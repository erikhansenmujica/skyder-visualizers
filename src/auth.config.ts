import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.endsWith("dashboard");
      const isOnLogin = nextUrl.pathname.endsWith("login");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect("https://app.skyderdigital.com/login");
      } else if (isOnLogin) {
        if (isLoggedIn)
          return Response.redirect("https://app.skyderdigital.com/dashboard");
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
