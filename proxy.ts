import { NextResponse, type NextRequest } from "next/server";

// Kept local: proxy runs separately from the app and should not rely on shared modules.
const locales = ["it", "en"];
const defaultLocale = "it";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split("/");

  // /it/... is served at the root — redirect to the clean URL to avoid duplicates.
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (locales.includes(first)) return;

  // Visitors who explicitly picked English get sent back to it.
  if (request.cookies.get("lang")?.value === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API, Next/Vercel internals, metadata routes and any file with an extension.
  matcher: [
    "/((?!api|_next|_vercel|.*opengraph-image|.*twitter-image|icon|apple-icon|.*\\..*).*)",
  ],
};
