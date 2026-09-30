import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/config/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never redirect audio streaming routes
  if (pathname.includes("/audio")) {
    const cleanPath = pathname.replace(/^\/(el|en)/, "");
    if (cleanPath !== pathname) {
      request.nextUrl.pathname = cleanPath;
      return NextResponse.rewrite(request.nextUrl);
    }
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get("accept-language");
  let locale = defaultLocale;

  if (
    acceptLanguage &&
    acceptLanguage.toLowerCase().includes("en") &&
    !acceptLanguage.toLowerCase().startsWith("el")
  ) {
    locale = "en";
  }

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next|assets|private|favicon.ico|icon-192.png|apple-touch-icon.png|robots.txt|sitemap.xml|.*\\..*).*)"
  ]
};
