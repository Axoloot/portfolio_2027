import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first.startsWith("fr") ? "fr" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/"] };
