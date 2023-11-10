import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|faviconlogo.png|content|globals.css|logo.png|locales|fonts|static).*)",
  ],
};

export function middleware(req: any) {
  if (
    req.nextUrl.pathname === "/sitemap.xml" ||
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/api" ||
    req.nextUrl.pathname === "/cardbg.jpeg" ||
    req.nextUrl.pathname.includes("dashboard") ||
    req.nextUrl.pathname === "/robots.txt"
  ) {
    if (
      req.nextUrl.pathname.includes("dashboard") ||
      req.nextUrl.pathname === "/login"
    ) {
      return NextAuth(authConfig).auth(req);
    }
    return NextResponse.next();
  }
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc: string) =>
      req.nextUrl.pathname.startsWith(`/${loc}`)
    ) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const { searchParams } = req.nextUrl;
    let params = "";
    searchParams.forEach((value: string, key: string) => {
      params = `${params ? `${params}&` : "?"}${key}=${value}`;
    });
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${params}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
