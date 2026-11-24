import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  if (pathname === "/") {
    const accept = request.headers.get("accept-language") ?? "";
    const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
    url.pathname = `/${first.startsWith("fr") ? "fr" : "en"}`;
    return NextResponse.redirect(url);
  }
  // Unknown top-level paths would land in [lang] and show the bare default 404.
  // Send them to a path no route matches, so the branded global 404 renders.
  url.pathname = "/_/not-found/page";
  return NextResponse.rewrite(url);
}

// "/" plus any first segment that is not a locale, the old portfolio, Next internals or a file.
export const config = { matcher: ["/", "/((?!en(?:/|$)|fr(?:/|$)|old|portfolio-2024|_next|[^/]*\\.[^/]+$).*)"] };
